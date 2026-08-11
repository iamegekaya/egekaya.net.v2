"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import LanguageToggle from "@/components/navigation/language-toggle";
import ThemeToggle from "@/components/theme/theme-toggle";
import {
  CameraIcon,
  CloseIcon,
  DownloadIcon,
  HomeIcon,
  MailIcon,
  MenuIcon,
  PersonIcon,
  TerminalIcon,
} from "@/components/ui/icon";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

type NavItem = {
  /** Locale-agnostic path; localizePath turns it into the real href. */
  path: string;
  labelKey: keyof Dictionary["nav"];
  /** Shown in the mobile overlay only; the desktop bar stays text-only. */
  Icon: (props: { className?: string }) => React.ReactElement;
};

const NAV_ITEMS: NavItem[] = [
  { path: "/", labelKey: "home", Icon: HomeIcon },
  { path: "/about", labelKey: "about", Icon: PersonIcon },
  { path: "/cyber-security", labelKey: "security", Icon: TerminalIcon },
  { path: "/photography", labelKey: "photography", Icon: CameraIcon },
  { path: "/contact", labelKey: "contact", Icon: MailIcon },
];

const PANEL_ID = "site-nav-overlay";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
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
        {dict.nav.skipToContent}
      </a>

      <header className="fixed top-0 z-50 w-full border-b border-outline-variant bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:h-20 md:px-10">
          {/* Logo, nav links and the theme toggle all sit in a 40px box so their
              hover backgrounds and underlines line up. Without it they measured
              42 / 39 / 36px: centred by the flex row, but visibly ragged the
              moment anything painted a background. `leading-none` is what lets
              the 28px logo fit a 40px box. */}
          <Link
            href={localizePath("/", locale)}
            className="flex h-10 items-center font-mono text-[18px] leading-none md:text-[20px] font-bold tracking-tighter text-primary-fixed transition-opacity hover:opacity-80"
            aria-current={isActive(pathname, localizePath("/", locale)) ? "page" : undefined}
          >
            EGE_KAYA //
          </Link>

          <nav aria-label="Main" className="hidden md:flex items-center gap-2 font-mono text-[14px] uppercase tracking-widest">
            {NAV_ITEMS.map((item) => {
              const href = localizePath(item.path, locale);
              const active = isActive(pathname, href);
              return (
                <Link
                  key={item.path}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-10 items-center rounded px-3 transition-colors duration-300 ${
                    active
                      ? "border-b-2 border-primary-fixed text-primary-fixed"
                      : "text-on-surface-variant hover:bg-primary-container/10 hover:text-primary-fixed"
                  }`}
                >
                  {dict.nav[item.labelKey]}
                </Link>
              );
            })}
            <LanguageToggle locale={locale} dict={dict} className="ml-4" />
            <ThemeToggle
              switchToDarkLabel={dict.nav.switchToDark}
              switchToLightLabel={dict.nav.switchToLight}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-variant"
            />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle locale={locale} dict={dict} />
            <ThemeToggle
              switchToDarkLabel={dict.nav.switchToDark}
              switchToLightLabel={dict.nav.switchToLight}
              className="p-2"
            />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label={dict.nav.openMenu}
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
            <p className="font-mono text-[20px] font-bold text-primary-fixed">{dict.nav.shellAccess}</p>
            <p className="font-mono text-[13px] text-on-surface-variant">{dict.nav.shellTagline}</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={dict.nav.closeMenu}
            className="rounded p-2 text-on-surface hover:text-primary-fixed active:scale-95 transition-transform"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <nav aria-label="Main" className="flex flex-1 flex-col justify-center gap-2 py-6 font-mono text-[15px]">
          {NAV_ITEMS.map((item) => {
            const href = localizePath(item.path, locale);
            const active = isActive(pathname, href);
            return (
              <Link
                key={item.path}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={close}
                className={`flex items-center gap-4 rounded-xl border p-4 transition-all duration-300 hover:pl-6 ${
                  active
                    ? "border-outline-variant bg-secondary-container font-bold text-on-secondary-container"
                    : "border-outline-variant bg-surface-container-low text-on-surface-variant hover:bg-surface-variant"
                }`}
              >
                <item.Icon className="h-5 w-5 shrink-0" />
                {dict.nav[item.labelKey]}
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
          {dict.nav.downloadCv}
        </a>
      </div>
    </>
  );
}
