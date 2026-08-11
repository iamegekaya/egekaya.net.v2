import type { Metadata } from "next";

import { SITE_URL } from "@/lib/site-url";

/**
 * Metadata every page inherits, shared by both root layouts.
 *
 * Split out of the old single root layout when the tree was divided into (en)
 * and (tr): two layouts needed the same base, and a second copy is how the two
 * would have drifted.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "egekaya.net",
  // The name carries the title rather than the domain: almost all search
  // traffic to a personal site is a name query, and unlike the description
  // the title is an actual ranking signal.
  title: {
    default: "Ege Kaya — Information Security & Photography",
    template: "%s — Ege Kaya",
  },
  description: "Information security and photography portfolio.",
  authors: [{ name: "Ege Kaya", url: SITE_URL }],
  creator: "Ege Kaya",
  // Google has ignored the keywords meta tag since 2009, so this earns nothing
  // on ranking. Kept only because a few smaller engines still read it and it
  // costs one tag; the terms track the degree name rather than contradicting it.
  keywords: [
    "egekaya",
    "Ege Kaya",
    "information security",
    "bilgi güvenliği",
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
    url: SITE_URL,
    title: "egekaya.net",
    description: "Information security and photography portfolio.",
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
    description: "Information security and photography portfolio.",
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
