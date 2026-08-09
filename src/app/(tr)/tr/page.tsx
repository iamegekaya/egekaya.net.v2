import type { Metadata } from "next";

import HomeView from "@/components/home/home-view";
import { tr } from "@/i18n";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  description: tr.home.metaDescription,
  alternates: {
    canonical: "/tr",
    // hreflang is what actually tells a search engine these are the same page
    // in two languages. x-default points at English as the fallback.
    languages: { en: "/", tr: "/tr", "x-default": "/" },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    locale: "tr_TR",
    description: tr.home.metaDescription,
    url: "/tr",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    description: tr.home.metaDescription,
    images: twitterImage,
  },
};

export default function TurkishHomePage() {
  return <HomeView dict={tr} locale="tr" />;
}
