import type { Metadata } from "next";

import ContactView from "@/components/contact/contact-view";
import { tr } from "@/i18n";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  title: tr.contact.metaTitle,
  description: tr.contact.metaDescription,
  alternates: {
    canonical: "/tr/contact",
    languages: { en: "/contact", tr: "/tr/contact", "x-default": "/contact" },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    locale: "tr_TR",
    title: `${tr.contact.metaTitle} — Ege Kaya`,
    description: tr.contact.metaDescription,
    url: "/tr/contact",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: `${tr.contact.metaTitle} — Ege Kaya`,
    description: tr.contact.metaDescription,
    images: twitterImage,
  },
};

export default function TurkishContactPage() {
  return <ContactView dict={tr} />;
}
