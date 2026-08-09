import type { Metadata } from "next";

import OmniSightView from "@/components/omnisight/omnisight-view";
import { tr } from "@/i18n";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  title: tr.omnisight.metaTitle,
  description: tr.omnisight.metaDescription,
  alternates: {
    canonical: "/tr/cyber-security/omnisight",
    languages: {
      en: "/cyber-security/omnisight",
      tr: "/tr/cyber-security/omnisight",
      "x-default": "/cyber-security/omnisight",
    },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    locale: "tr_TR",
    title: `${tr.omnisight.metaTitle} — Ege Kaya`,
    description: tr.omnisight.metaDescription,
    url: "/tr/cyber-security/omnisight",
    type: "article",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: `${tr.omnisight.metaTitle} — Ege Kaya`,
    description: tr.omnisight.metaDescription,
    images: twitterImage,
  },
};

export default function TurkishOmniSightPage() {
  return <OmniSightView dict={tr} locale="tr" />;
}
