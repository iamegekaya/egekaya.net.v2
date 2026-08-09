import type { Metadata } from "next";

import AboutView from "@/components/about/about-view";
import { en } from "@/i18n";

import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  title: "About",
  description:
    "Personal background, education, and interests of Ege Kaya — born 2003 in Lüleburgaz, working in information security and photography, based in Istanbul.",
  alternates: {
    canonical: "/about",
    languages: { en: "/about", tr: "/tr/about", "x-default": "/about" },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    title: "About — Ege Kaya",
    description:
      "Personal background, education, and interests of Ege Kaya — information security and photography.",
    url: "/about",
    type: "profile",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Ege Kaya",
    description:
      "Personal background, education, and interests — information security and photography.",
    images: twitterImage,
  },
};

export default function AboutPage() {
  return <AboutView dict={en} locale="en" />;
}
