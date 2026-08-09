import type { Metadata } from "next";

import OmniSightView from "@/components/omnisight/omnisight-view";
import { en } from "@/i18n";

import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

const TITLE = "OmniSight";
const DESCRIPTION =
  "A self-hosted network visibility and SIEM-oriented product built around one constraint: metadata only, never content. Architecture, the boundaries I committed to, and what they cost.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/cyber-security/omnisight",
    languages: {
      en: "/cyber-security/omnisight",
      tr: "/tr/cyber-security/omnisight",
      "x-default": "/cyber-security/omnisight",
    },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    title: `${TITLE} — Ege Kaya`,
    description: DESCRIPTION,
    url: "/cyber-security/omnisight",
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

export default function OmniSightPage() {
  return <OmniSightView dict={en} locale="en" />;
}
