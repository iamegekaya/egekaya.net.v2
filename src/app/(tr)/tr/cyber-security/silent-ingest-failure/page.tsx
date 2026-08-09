import type { Metadata } from "next";

import IncidentView from "@/components/security/incident-view";
import { tr } from "@/i18n";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  title: tr.incident.metaTitle,
  description: tr.incident.metaDescription,
  alternates: {
    canonical: "/tr/cyber-security/silent-ingest-failure",
    languages: {
      en: "/cyber-security/silent-ingest-failure",
      tr: "/tr/cyber-security/silent-ingest-failure",
      "x-default": "/cyber-security/silent-ingest-failure",
    },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    locale: "tr_TR",
    title: `${tr.incident.metaTitle} — Ege Kaya`,
    description: tr.incident.metaDescription,
    url: "/tr/cyber-security/silent-ingest-failure",
    type: "article",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: `${tr.incident.metaTitle} — Ege Kaya`,
    description: tr.incident.metaDescription,
    images: twitterImage,
  },
};

export default function TurkishIncidentPage() {
  return <IncidentView dict={tr} locale="tr" />;
}
