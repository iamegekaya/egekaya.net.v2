import type { Metadata } from "next";

import SecurityView from "@/components/security/security-view";
import { tr } from "@/i18n";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  title: tr.security.metaTitle,
  description: tr.security.metaDescription,
  alternates: {
    canonical: "/tr/cyber-security",
    languages: { en: "/cyber-security", tr: "/tr/cyber-security", "x-default": "/cyber-security" },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    locale: "tr_TR",
    title: `${tr.security.metaTitle} — Ege Kaya`,
    description: tr.security.metaDescription,
    url: "/tr/cyber-security",
    type: "profile",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: `${tr.security.metaTitle} — Ege Kaya`,
    description: tr.security.metaDescription,
    images: twitterImage,
  },
};

export default function TurkishSecurityPage() {
  return <SecurityView dict={tr} locale="tr" />;
}
