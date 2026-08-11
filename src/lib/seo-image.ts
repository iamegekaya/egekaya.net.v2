import type { Metadata } from "next";

const OG_ALT = "egekaya.net — Cyber Security · Photography. Ege Kaya's portfolio.";

const openGraphImage: NonNullable<NonNullable<Metadata["openGraph"]>["images"]> = [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: OG_ALT,
  },
];

const twitterImage: NonNullable<NonNullable<Metadata["twitter"]>["images"]> = [
  {
    url: "/twitter-image",
    alt: OG_ALT,
  },
];

/**
 * Fields every page's `openGraph` block has to repeat.
 *
 * Next replaces the whole `openGraph` object when a page defines its own, so
 * anything set only in the root layout — siteName, locale — silently disappears
 * from every page that declares one. Spread this into each page's block.
 */
const openGraphSiteDefaults = {
  siteName: "egekaya.net",
  locale: "en_US",
} satisfies Pick<NonNullable<Metadata["openGraph"]>, "siteName" | "locale">;

export { openGraphImage, openGraphSiteDefaults, twitterImage };
