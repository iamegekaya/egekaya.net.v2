import type { Metadata } from "next";
import HomeView from "@/components/home/home-view";
import { en } from "@/i18n";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  description:
    "Ege Kaya — information security and photography. Zero Trust infrastructure, SecOps automation, and a photo portfolio.",
  alternates: {
    canonical: "/",
    languages: { en: "/", tr: "/tr", "x-default": "/" },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    title: "egekaya.net",
    description:
      "Information security and photography. Zero Trust infrastructure, SecOps automation, and a photo portfolio.",
    url: "/",
    type: "website",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: "egekaya.net",
    description:
      "Information security and photography. Zero Trust infrastructure, SecOps automation, and a photo portfolio.",
    images: twitterImage,
  },
};

export default function HomePage() {
  return <HomeView dict={en} locale="en" />;
}
