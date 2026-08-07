"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import ThemeToggle from "@/components/theme/theme-toggle";
import { CloseIcon, DownloadIcon, MenuIcon } from "@/components/ui/icon";

type NavItem = {
  label: string;
  href: Route;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Security", href: "/cyber-security" },
  { label: "Photography", href: "/photography" },
  { label: "Contact", href: "/contact" },
];

const PANEL_ID = "site-nav-overlay";

function isActive(pathname: string | null, href: Route) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  // Focus trap + Escape + focus return, same contract the old BubbleMenu used
  // for its overlay -- ported rather than re-invented.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!open || !overlay) return;

    const toggleButton = toggleRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getFocusable = () =>
      Array.from(overlay.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));

    const raf = requestAnimationFrame(() => {
      getFocusable()[0]?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
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
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      const restoreTarget = previouslyFocused && previouslyFocused !== document.body ? previouslyFocused : toggleButton;
      restoreTarget?.focus();
    };
  }, [open, close]);

  return (
    <>
      <a className="site-skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="fixed top-0 z-50 w-full border-b border-outline-variant bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:h-20 md:px-10">
          <Link
            href="/"
            className="font-mono text-[22px] md:text-[28px] font-bold tracking-tighter text-primary-fixed transition-opacity hover:opacity-80"
            aria-current={isActive(pathname, "/") ? "page" : undefined}
          >
            EGE_KAYA //
          </Link>

          <nav aria-label="Main" className="hidden md:flex items-center gap-2 font-mono text-[14px] uppercase tracking-widest">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded px-3 py-2 transition-colors duration-300 ${
                    active
                      ? "border-b-2 border-primary-fixed text-primary-fixed"
                      : "text-on-surface-variant hover:bg-primary-container/10 hover:text-primary-fixed"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <ThemeToggle className="ml-4 rounded-full p-2 hover:bg-surface-variant" />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle className="p-2" />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls={PANEL_ID}
              className="rounded p-2 text-on-surface hover:text-primary-fixed active:scale-95 transition-transform"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div
        id={PANEL_ID}
        ref={overlayRef}
        inert={!open}
        className={`site-nav-overlay fixed inset-0 z-[60] flex flex-col bg-surface-container-lowest p-4 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-outline-variant pb-4">
          <div>
            <p className="font-mono text-[20px] font-bold text-primary-fixed">[SHELL_ACCESS]</p>
            <p className="font-mono text-[13px] text-on-surface-variant">Cybersecurity &amp; Photography</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="rounded p-2 text-on-surface hover:text-primary-fixed active:scale-95 transition-transform"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <nav aria-label="Main" className="flex flex-1 flex-col justify-center gap-2 py-6 font-mono text-[15px]">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={close}
                className={`rounded-xl p-4 transition-all duration-300 hover:pl-6 ${
                  active
                    ? "bg-secondary-container font-bold text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a
          href="https://cv.egekaya.net"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded border border-primary-fixed py-3 font-mono text-[14px] uppercase tracking-widest text-primary-fixed transition-colors hover:bg-primary-fixed/10"
        >
          <DownloadIcon className="h-4 w-4" />
          Download CV
        </a>
      </div>
    </>
  );
}
