import type { Metadata } from "next";

import ContactView from "@/components/contact/contact-view";
import { en } from "@/i18n";

import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ege Kaya for collaborations, questions, or just to say hi. Email iamegekaya@egekaya.net or use the contact form.",
  alternates: {
    canonical: "/contact",
    languages: { en: "/contact", tr: "/tr/contact", "x-default": "/contact" },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    title: "Contact — Ege Kaya",
    description:
      "Get in touch for collaborations or just to say hi. Email iamegekaya@egekaya.net or use the form.",
    url: "/contact",
    type: "website",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Ege Kaya",
    description: "Get in touch for collaborations or just to say hi. Email: iamegekaya@egekaya.net.",
    images: twitterImage,
  },
};

export default function ContactPage() {
  return <ContactView dict={en} />;
}
