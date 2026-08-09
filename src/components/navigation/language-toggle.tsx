"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DEFAULT_LOCALE, localizePath, stripLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

/**
 * EN / TR switch.
 *
 * A real <Link>, not a button that pushes a route: the other language of the
 * current page is a distinct URL, so it should be crawlable, middle-clickable
 * and openable in a new tab like any other link.
 *
 * It maps the *current* path across locales rather than sending everyone to the
 * home page — switching language halfway down the security page should keep you
 * on the security page.
 */
export default function LanguageToggle({
  locale,
  dict,
  className = "",
}: {
  locale: Locale;
  dict: Dictionary;
  className?: string;
}) {
  const pathname = usePathname();
  const other: Locale = locale === DEFAULT_LOCALE ? "tr" : DEFAULT_LOCALE;

  const { path } = stripLocale(pathname ?? "/");
  const href = localizePath(path, other);

  return (
    <Link
      href={href}
      hrefLang={other}
      aria-label={other === "tr" ? dict.nav.switchToTurkish : dict.nav.switchToEnglish}
      className={`flex h-10 w-10 items-center justify-center rounded-full font-mono text-[13px] font-semibold tracking-wider text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary-fixed ${className}`.trim()}
    >
      {other.toUpperCase()}
    </Link>
  );
}
