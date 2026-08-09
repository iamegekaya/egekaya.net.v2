import type { Metadata } from "next";

import SecurityView from "@/components/security/security-view";
import { en } from "@/i18n";

import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

export const metadata: Metadata = {
  title: "Cyber Security",
  description:
    "Zero Trust, hybrid Docker + native architecture, Cloudflare edge logging, SecOps automation with n8n + AI, Tailscale mesh VPN. Aktif Yatırım Bankası security intern.",
  alternates: {
    canonical: "/cyber-security",
    languages: { en: "/cyber-security", tr: "/tr/cyber-security", "x-default": "/cyber-security" },
  },
  openGraph: {
    ...openGraphSiteDefaults,
    title: "Cyber Security — Ege Kaya",
    description:
      "Zero Trust, hybrid architecture, Cloudflare edge, SecOps automation (n8n + AI), and Blue Team work.",
    url: "/cyber-security",
    type: "profile",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Security — Ege Kaya",
    description:
      "Zero Trust, hybrid architecture, Cloudflare edge, SecOps automation — Ege Kaya.",
    images: twitterImage,
  },
};

export default function CyberSecurityPage() {
  return <SecurityView dict={en} locale="en" />;
}
