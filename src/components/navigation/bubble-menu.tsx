"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// Ported from React Bits' BubbleMenu. This replaces StaggeredMenu as the
// site's only navigation, so it inherits StaggeredMenu's accessibility work
// rather than upstream's bare version: upstream had no Escape handling, no
// focus trap, no click-away, `aria-pressed` on what is semantically a
// disclosure toggle (should be `aria-expanded` + `aria-controls`), and no
// active-page marker. All of that is added here, not upstream behavior.
export type BubbleMenuItem = {
  label: string;
  href: Route | `https://${string}` | `http://${string}`;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: { bgColor?: string; textColor?: string };
};

type BubbleMenuProps = {
  logo: ReactNode;
  logoHref?: Route;
  items: BubbleMenuItem[];
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
};

const PANEL_ID = "bubble-menu-panel";

export default function BubbleMenu({
  logo,
  logoHref = "/" as Route,
  items,
  menuAriaLabel = "Toggle menu",
  menuBg = "var(--surface-panel-bg)",
  menuContentColor = "var(--foreground)",
  useFixedPosition = true,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
  onMenuClick,
  className,
  style,
}: BubbleMenuProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const openRef = useRef(false);

  const containerClassName = ["bubble-menu", useFixedPosition ? "fixed" : "absolute", className]
    .filter(Boolean)
    .join(" ");

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setIsMenuOpen(false);
    onMenuClick?.(false);
  }, [onMenuClick]);

  const handleToggle = () => {
    const next = !openRef.current;
    openRef.current = next;
    if (next) setShowOverlay(true);
    setIsMenuOpen(next);
    onMenuClick?.(next);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLAnchorElement[];
    const labels = labelRefs.current.filter(Boolean) as HTMLSpanElement[];

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, { scale: 1, duration: animationDuration, ease: animationEase });
        if (labels[i]) {
          tl.to(
            labels[i],
            { y: 0, autoAlpha: 1, duration: animationDuration, ease: "power3.out" },
            `-=${animationDuration * 0.9}`,
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: "power3.in" });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
        },
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (!isMenuOpen) return;
      const bubbles = bubblesRef.current.filter(Boolean) as HTMLAnchorElement[];
      const isDesktop = window.innerWidth >= 900;

      bubbles.forEach((bubble, i) => {
        const item = items[i];
        if (bubble && item) {
          gsap.set(bubble, { rotation: isDesktop ? (item.rotation ?? 0) : 0 });
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, items]);

  // Click-away, matching StaggeredMenu's closeOnClickAway default.
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: PointerEvent) {
      const overlay = overlayRef.current;
      const toggle = toggleRef.current;
      const target = event.target as Node;
      if (overlay && !overlay.contains(target) && toggle && !toggle.contains(target)) {
        closeMenu();
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isMenuOpen, closeMenu]);

  // Keyboard access: Escape closes, Tab stays inside the pill list while
  // open, and focus moves in on open and back to the toggle on close --
  // same contract as StaggeredMenu's panel.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!isMenuOpen || !overlay) return;

    const toggleButton = toggleRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = () =>
      (bubblesRef.current.filter(Boolean) as HTMLAnchorElement[]).filter(
        (element) => element.offsetParent !== null,
      );

    const raf = requestAnimationFrame(() => {
      getFocusable()[0]?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !overlay.contains(active))) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown);
      const restoreTarget =
        previouslyFocused && previouslyFocused !== document.body ? previouslyFocused : toggleButton;
      restoreTarget?.focus();
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      <nav className={containerClassName} style={style} aria-label="Main navigation">
        <Link
          href={logoHref}
          className="bubble logo-bubble"
          aria-label="Ege Kaya home"
          aria-current={pathname === logoHref ? "page" : undefined}
          style={{ background: menuBg, color: menuContentColor }}
        >
          <span className="logo-content">{logo}</span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className={`bubble toggle-bubble menu-btn ${isMenuOpen ? "open" : ""}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-expanded={isMenuOpen}
          aria-controls={PANEL_ID}
          style={{ background: menuBg }}
        >
          <span className="menu-line" style={{ background: menuContentColor }} />
          <span className="menu-line short" style={{ background: menuContentColor }} />
        </button>
      </nav>

      {showOverlay && (
        // `inert` rather than `aria-hidden`: the overlay stays mounted for
        // the 200ms close animation, and aria-hidden alone would leave
        // focusable pill links inside a hidden subtree for that whole
        // window (same defect StaggeredMenu's panel was built to avoid).
        <div
          id={PANEL_ID}
          ref={overlayRef}
          className={`bubble-menu-items ${useFixedPosition ? "fixed" : "absolute"}`}
          inert={!isMenuOpen}
        >
          {/* role="list" + plain links, not role="menu"/"menuitem": those
              imply arrow-key roving-tabindex navigation, but the focus trap
              below moves between items with Tab, matching StaggeredMenu. */}
          <ul className="pill-list" role="list" aria-label="Menu links">
            {items.map((item, idx) => {
              const isInternal = !item.href.startsWith("http://") && !item.href.startsWith("https://");
              const isActive =
                isInternal &&
                typeof pathname === "string" &&
                (pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)));

              const pillStyle = {
                "--item-rot": `${item.rotation ?? 0}deg`,
                "--pill-bg": menuBg,
                "--pill-color": menuContentColor,
                "--hover-bg": item.hoverStyles?.bgColor || "var(--accent-bg-hover)",
                "--hover-color": item.hoverStyles?.textColor || menuContentColor,
              } as CSSProperties;

              return (
                <li key={item.label} className="pill-col">
                  {isInternal ? (
                    <Link
                      href={item.href}
                      aria-label={item.ariaLabel ?? item.label}
                      aria-current={isActive ? "page" : undefined}
                      className="pill-link"
                      style={pillStyle}
                      onClick={closeMenu}
                      ref={(el) => {
                        bubblesRef.current[idx] = el;
                      }}
                    >
                      <span
                        className="pill-label"
                        ref={(el) => {
                          labelRefs.current[idx] = el;
                        }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      aria-label={item.ariaLabel ?? item.label}
                      className="pill-link"
                      style={pillStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      ref={(el) => {
                        bubblesRef.current[idx] = el;
                      }}
                    >
                      <span
                        className="pill-label"
                        ref={(el) => {
                          labelRefs.current[idx] = el;
                        }}
                      >
                        {item.label}
                      </span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
