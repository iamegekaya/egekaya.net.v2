import type { Metadata } from "next";

import LineSidebar from "@/components/ui/line-sidebar";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  description:
    "Ege Kaya — cyber security engineer and photographer. Interactive profile, work, and contact on one page.",
  alternates: { canonical: "/" },
  openGraph: {
    ...openGraphSiteDefaults,
    title: "egekaya.net",
    description:
      "Cyber security engineer and photographer. Interactive profile, work, and contact.",
    url: "/",
    type: "website",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: "egekaya.net",
    description:
      "Cyber security engineer and photographer. Interactive profile, work, and contact.",
    images: twitterImage,
  },
};

export default function HomePage() {
  return (
    <main className="home-main">
      <LineSidebar side="left" />
    </main>
  );
}
