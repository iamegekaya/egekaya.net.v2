import type { Metadata } from "next";

import IncidentView from "@/components/security/incident-view";
import { en } from "@/i18n";

import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

const TITLE = "Silent Ingest Failure";
const DESCRIPTION =
  "A hardened home lab denied 35 hours of agent telemetry while every health signal stayed green. Root cause, why the monitoring missed it, and the rule I took from it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/cyber-security/silent-ingest-failure",
    languages: {
      en: "/cyber-security/silent-ingest-failure",
      tr: "/tr/cyber-security/silent-ingest-failure",
      "x-default": "/cyber-security/silent-ingest-failure",
    },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    title: `${TITLE} — Ege Kaya`,
    description: DESCRIPTION,
    url: "/cyber-security/silent-ingest-failure",
    type: "article",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Ege Kaya`,
    description: DESCRIPTION,
    images: twitterImage,
  },
};

export default function SilentIngestFailurePage() {
  return <IncidentView dict={en} locale="en" />;
}
