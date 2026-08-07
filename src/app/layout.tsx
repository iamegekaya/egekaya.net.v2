import type { Metadata } from "next";

import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
