import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";

import MasonryGallery from "@/components/photography/masonry-gallery";
import TerminalWindow from "@/components/ui/terminal-window";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";
import { TEXT_DISPLAY_LG, TEXT_HEADLINE_MD, TEXT_LABEL_CAPS } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Photo essay and portfolio by Ege Kaya. Started November 2023 on Canon, moved through Sony A7M2, now shooting Fujifilm XM-5 + XC 15-45mm. 13 selected frames.",
  alternates: { canonical: "/photography" },
  openGraph: {
    ...openGraphSiteDefaults,
    title: "Photography — Ege Kaya",
    description:
      "Photo essay and portfolio — Fujifilm XM-5, started November 2023, 13 selected frames.",
    url: "/photography",
    type: "article",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: "Photography — Ege Kaya",
    description:
      "Photo essay and portfolio — Fujifilm XM-5, started November 2023, 13 selected frames.",
    images: twitterImage,
  },
};

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

const portfolioDirectory = join(process.cwd(), "public", "images", "portfolio");

function readPortfolioPhotos() {
  let fileNames: string[];

  try {
    fileNames = readdirSync(portfolioDirectory);
  } catch {
    // Read at build time, so a missing folder would otherwise fail the whole
    // build instead of degrading this one section.
    return [];
  }

  return fileNames
    .filter((file) => /\.(avif|gif|jpe?g|png|webp)$/i.test(file))
    .sort((left, right) => collator.compare(left, right))
    .map((fileName, index) => ({
      image: `/images/portfolio/${fileName}`,
      alt: `Portfolio photo ${index + 1}`,
      href: `/images/portfolio/${fileName}`,
    }));
}

const portfolioPhotos = readPortfolioPhotos();

const equipment = [
  {
    name: "Fujifilm XM-5 Body",
    href: "https://www.fujifilm-x.com/en-us/products/cameras/x-m5/",
    note: "My current camera body.",
  },
  {
    name: "Fujinon XC 15-45mm f/3.5-5.6 OIS PZ Lens",
    href: "https://www.fujifilm-x.com/global/products/lenses/xc15-45mmf35-56-ois-pz/",
    note: "The lens currently paired with the XM-5.",
  },
];

export default function PhotographyPage() {
  return (
    <main className="site-page">
      <div className="site-page-inner flex flex-col gap-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className={`${TEXT_DISPLAY_LG} text-on-surface mb-2`}>GALLERY_INDEX</h1>
            <p className="font-mono text-[13px] tracking-widest text-on-surface-variant uppercase">
              [ Visual data capture ]
            </p>
          </div>
          <p className="hidden font-mono text-[14px] text-outline md:block">
            &gt; STATUS: <span className="text-primary-fixed">[ONLINE]</span>
          </p>
        </header>

        <TerminalWindow title="./story.sh" bodyClassName="p-6 md:p-8">
          <p className="font-sans text-[16px] leading-relaxed text-on-surface mb-3">
            Photography is somewhat of an escape from the screen for me. Usually, my day passes in front of the
            computer — taking my camera, going outside, wandering around, and photographing things genuinely
            does me good.
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-on-surface-variant">
            I bought my first camera, a Canon Rebel T7, on November 8, 2023. From there I moved through a Sony
            A7M2 before landing on the Fujifilm XM-5 I currently shoot with.
          </p>
        </TerminalWindow>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {equipment.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-border flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface p-6 transition-colors"
            >
              <span className={`${TEXT_LABEL_CAPS} text-on-surface-variant`}>Current Gear</span>
              <h3 className="font-sans text-[17px] font-semibold text-on-surface">{item.name}</h3>
              <p className="font-sans text-[14px] text-on-surface-variant">{item.note}</p>
              <span className="mt-2 font-mono text-[12px] tracking-[0.14em] text-primary-fixed uppercase">
                Open official page
              </span>
            </a>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={`${TEXT_HEADLINE_MD} text-on-surface border-b border-outline-variant pb-2`}>
            Photo Gallery
          </h2>
          {portfolioPhotos.length ? (
            <MasonryGallery photos={portfolioPhotos} />
          ) : (
            <p className="font-sans text-[15px] text-on-surface-variant">
              The gallery is unavailable right now. Please check back shortly.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
