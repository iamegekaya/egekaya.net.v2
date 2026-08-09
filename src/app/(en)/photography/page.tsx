import type { Metadata } from "next";

import PhotographyView from "@/components/photography/photography-view";
import { en } from "@/i18n";

import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Photo essay and portfolio by Ege Kaya. Started November 2023 on Canon, moved through Sony A7M2, now shooting Fujifilm X-M5 + XC 15-45mm. 13 selected frames.",
  alternates: {
    canonical: "/photography",
    languages: { en: "/photography", tr: "/tr/photography", "x-default": "/photography" },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    title: "Photography — Ege Kaya",
    description:
      "Photo essay and portfolio — Fujifilm X-M5, started November 2023, 13 selected frames.",
    url: "/photography",
    type: "article",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: "Photography — Ege Kaya",
    description:
      "Photo essay and portfolio — Fujifilm X-M5, started November 2023, 13 selected frames.",
    images: twitterImage,
  },
};

export default function PhotographyPage() {
  return <PhotographyView dict={en} />;
}
