import { Inter, JetBrains_Mono } from "next/font/google";

import { HTML_LANG, type Locale } from "@/i18n/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Runs before paint so the stored/system theme preference applies without a
// flash of the wrong palette. `data-theme` (not a class) matches the tokens
// defined in globals.css; ThemeToggle writes the same key.
//
// It no longer touches `lang`. That used to be corrected here because a single
// root layout could not know the locale; there are two root layouts now, so the
// served HTML carries the right value and no client fix-up is needed.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (error) {}
})();
`;

/**
 * The <html>/<body> document, shared by both root layouts.
 *
 * Next allows more than one root layout only when the top level of app/ is
 * nothing but route groups — which is why the pages live under (en) and (tr).
 * That is what lets each tree serve its own `lang` in the HTML itself rather
 * than patching it on the client.
 */
export default function RootDocument({
  locale,
  children,
}: Readonly<{ locale: Locale; children: React.ReactNode }>) {
  return (
    // Font variable classNames go on <html>, not <body>: globals.css defines
    // --font-sans/--font-mono at :root as `var(--font-inter), ...`, and a
    // custom property's var() references resolve using the cascade AT THE
    // ELEMENT WHERE IT'S DECLARED, not wherever it's later used. With the
    // variables only visible on <body> (a descendant of :root), --font-sans
    // computed to invalid at :root and every element inherited that broken,
    // frozen value -- including elements with their own explicit font-mono/
    // font-sans utility class, since none of them redeclare --font-sans
    // themselves, they just inherit :root's already-invalid one.
    <html
      lang={HTML_LANG[locale]}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
