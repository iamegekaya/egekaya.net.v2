import type { Metadata } from "next";
import Link from "next/link";

import TerminalHero from "@/components/home/terminal-hero";
import { CameraIcon, TerminalIcon } from "@/components/ui/icon";
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

// Decorative fill for the Security card's background -- a fixed string
// rather than Math.random(): the mockup generated this with a synchronous
// `document.write`, which doesn't exist in React. Since it's pure decoration
// (aria-hidden, no information conveyed), a static string avoids a
// server/client hydration mismatch for zero visual difference.
const HEX_DUMP =
  "790082998EC2CAAD48764F67C631A0436C421A3F7606054003EC342397B94A42FDE71B3CA2855F61C6F8D080CBD1D2FOAE4F6E9B36AAE0984C89A020BE11037C23275DE742FE302E09FA3978079491C6D973833FA250814AFED28D667748F6D195565F0E174A7152C55EA228817691BA65A08F863841982F778689EA10FA87A9806884F8983497C0A929061E85D76CA88C5AED1D0456F0EDF96F83A02E7E0F340F85CF7025DFA5E46888";

export default function HomePage() {
  return (
    <main className="site-page">
      <div className="site-page-inner flex flex-col gap-16">
        <section className="flex min-h-[50vh] flex-col justify-center">
          <TerminalHero />
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link href="/cyber-security" className="group flex flex-col gap-4">
            <div className="flex items-end justify-between border-b border-outline-variant pb-2">
              <h2 className="font-mono text-[22px] uppercase tracking-wider text-primary-fixed">01 // Security</h2>
              <TerminalIcon className="h-5 w-5 text-outline-variant transition-colors group-hover:text-primary-fixed" />
            </div>
            <div className="glow-border relative flex h-72 flex-col justify-end overflow-hidden rounded border border-transparent bg-surface p-6 transition-colors">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 select-none overflow-hidden break-words p-4 font-mono text-[10px] text-primary-fixed opacity-10 transition-opacity duration-500 group-hover:opacity-20"
              >
                {HEX_DUMP}
              </div>
              <div className="relative z-10 border border-outline-variant/50 bg-background/80 p-4 backdrop-blur-sm">
                <div className="mb-3 flex gap-2">
                  <span className="rounded-sm border border-outline-variant/50 bg-surface-container-high px-2 py-1 font-mono text-[11px] tracking-[0.1em] text-on-surface-variant uppercase">
                    Zero Trust
                  </span>
                  <span className="rounded-sm border border-outline-variant/50 bg-surface-container-high px-2 py-1 font-mono text-[11px] tracking-[0.1em] text-on-surface-variant uppercase">
                    SecOps
                  </span>
                </div>
                <h3 className="mb-2 font-sans text-[18px] text-on-surface">Infrastructure &amp; Security</h3>
                <p className="flex items-center gap-2 font-mono text-[14px] text-on-surface-variant">
                  <span className="text-primary-fixed">&gt;</span> View architecture
                </p>
              </div>
            </div>
          </Link>

          <Link href="/photography" className="group mt-0 flex flex-col gap-4 md:mt-8">
            <div className="flex items-end justify-between border-b border-outline-variant pb-2">
              <h2 className="font-mono text-[22px] uppercase tracking-wider text-on-surface transition-colors group-hover:text-primary-fixed">
                02 // Photography
              </h2>
              <CameraIcon className="h-5 w-5 text-outline-variant transition-colors group-hover:text-primary-fixed" />
            </div>
            <div className="glow-border relative flex h-72 flex-col justify-end overflow-hidden rounded border border-transparent bg-surface p-6 transition-colors">
              <div className="absolute inset-0 flex items-center justify-center opacity-30 transition-opacity duration-700 group-hover:opacity-100">
                <div className="relative flex h-20 w-32 items-center justify-center border border-on-surface-variant">
                  <div className="h-12 w-12 rounded-full border border-primary-fixed" />
                  <div className="absolute top-1 right-2 h-2 w-2 rounded-full bg-error" />
                </div>
              </div>
              <div className="relative z-10 mt-auto flex items-end justify-between">
                <h3 className="font-sans text-[18px] text-on-surface">Visual Perspectives</h3>
                <span className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                  Fujifilm XM-5
                </span>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
