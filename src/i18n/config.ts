import type { Route } from "next";

/**
 * Locale configuration.
 *
 * English is unprefixed and Turkish lives under /tr. That asymmetry is
 * deliberate: every existing English URL — and the SEO built on top of the
 * seven-route sitemap — stays exactly where it is. Adding an /en prefix would
 * have broken all of them for no gain.
 *
 * The routing uses two parallel App Router trees rather than a [locale]
 * segment. A dynamic segment collides with the existing top-level routes
 * (/about would match [locale]="about") and the usual fix is middleware, which
 * would put an edge function in front of what is currently a fully static site.
 */
export const LOCALES = ["en", "tr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** BCP 47 tags for <html lang> and hreflang. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  tr: "tr",
};

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  tr: "TR",
};

/**
 * Turn a locale-agnostic path into the URL for a given locale.
 * localizePath("/about", "tr") -> "/tr/about"
 * localizePath("/about", "en") -> "/about"
 * localizePath("/", "tr")      -> "/tr"
 */
export function localizePath(path: string, locale: Locale): Route {
  if (locale === DEFAULT_LOCALE) return path as Route;
  return (path === "/" ? "/tr" : `/tr${path}`) as Route;
}

/** Inverse of localizePath: strip the locale prefix back off a live pathname. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  if (pathname === "/tr") return { locale: "tr", path: "/" };
  if (pathname.startsWith("/tr/")) return { locale: "tr", path: pathname.slice(3) };
  return { locale: DEFAULT_LOCALE, path: pathname };
}
