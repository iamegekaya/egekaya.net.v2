import type { Metadata } from "next";

import PhotographyView from "@/components/photography/photography-view";
import { tr } from "@/i18n";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  title: tr.photography.metaTitle,
  description: tr.photography.metaDescription,
  alternates: {
    canonical: "/tr/photography",
    languages: { en: "/photography", tr: "/tr/photography", "x-default": "/photography" },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    locale: "tr_TR",
    title: `${tr.photography.metaTitle} — Ege Kaya`,
    description: tr.photography.metaDescription,
    url: "/tr/photography",
    type: "article",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: `${tr.photography.metaTitle} — Ege Kaya`,
    description: tr.photography.metaDescription,
    images: twitterImage,
  },
};

export default function TurkishPhotographyPage() {
  return <PhotographyView dict={tr} />;
}
