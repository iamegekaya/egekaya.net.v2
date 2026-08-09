import type { Metadata } from "next";

import AboutView from "@/components/about/about-view";
import { tr } from "@/i18n";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  title: tr.about.metaTitle,
  description: tr.about.metaDescription,
  alternates: {
    canonical: "/tr/about",
    languages: { en: "/about", tr: "/tr/about", "x-default": "/about" },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    locale: "tr_TR",
    title: `${tr.about.metaTitle} — Ege Kaya`,
    description: tr.about.metaDescription,
    url: "/tr/about",
    type: "profile",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: `${tr.about.metaTitle} — Ege Kaya`,
    description: tr.about.metaDescription,
    images: twitterImage,
  },
};

export default function TurkishAboutPage() {
  return <AboutView dict={tr} locale="tr" />;
}
