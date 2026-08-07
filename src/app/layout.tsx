import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

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

const siteUrl = process.env.APP_URL?.replace(/\/$/, "") ?? "https://egekaya.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "egekaya.net",
  title: {
    default: "egekaya.net",
    template: "%s — egekaya.net",
  },
  description: "Cyber security engineer and photography portfolio.",
  authors: [{ name: "Ege Kaya", url: siteUrl }],
  creator: "Ege Kaya",
  keywords: [
    "egekaya",
    "Ege Kaya",
    "cyber security",
    "siber güvenlik",
    "photography",
    "portfolio",
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "egekaya.net",
    locale: "en_US",
    url: siteUrl,
    title: "egekaya.net",
    description: "Cyber security engineer and photography portfolio.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "egekaya.net — Cyber Security · Photography. Ege Kaya's portfolio.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "egekaya.net",
    description: "Cyber security engineer and photography portfolio.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
