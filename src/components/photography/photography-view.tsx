import { readdirSync } from "node:fs";
import { join } from "node:path";

import DecryptedText from "@/components/ui/decrypted-text";
import Masonry from "@/components/photography/masonry";
import SectionSidebar from "@/components/navigation/section-sidebar";
import TerminalWindow from "@/components/ui/terminal-window";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { readJpegSize } from "@/lib/jpeg-size";
import { TEXT_DISPLAY_LG, TEXT_HEADLINE_MD, TEXT_LABEL_CAPS } from "@/lib/typography";

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const portfolioDirectory = join(process.cwd(), "public", "images", "portfolio");

/** Fallback ratio when a file's header cannot be read (3:2 landscape). */
const FALLBACK_ASPECT = 2 / 3;

function optimizedSource(publicPath: string) {
  // The originals are 8-12 MB each; served raw through background-image they
  // would bypass next/image entirely and pull ~119 MB for one page. This is the
  // same optimizer endpoint <Image> uses.
  return `/_next/image?url=${encodeURIComponent(publicPath)}&w=1080&q=75`;
}

function portfolioPhotos(dict: Dictionary) {
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
    .map((fileName, index) => {
      const publicPath = `/images/portfolio/${fileName}`;
      const size = readJpegSize(join(portfolioDirectory, fileName));
      const aspect = size && size.width > 0 ? size.height / size.width : FALLBACK_ASPECT;

      return {
        id: fileName,
        img: optimizedSource(publicPath),
        url: publicPath,
        alt: `${dict.photography.photoAlt} ${index + 1}`,
        // Passed as a ratio, not a pixel height: the component sizes each box
        // against the live column width so nothing is ever cropped.
        aspect,
      };
    });
}

// Product names are proper nouns and stay identical; only the notes translate.
function equipment(dict: Dictionary) {
  const e = dict.photography.equipment;
  return [
    {
      name: "Fujifilm X-M5 Body",
      href: "https://www.fujifilm-x.com/en-us/products/cameras/x-m5/",
      note: e.bodyNote,
    },
    {
      name: "Fujinon XC 15-45mm f/3.5-5.6 OIS PZ Lens",
      href: "https://www.fujifilm-x.com/global/products/lenses/xc15-45mmf35-56-ois-pz/",
      note: e.lensNote,
    },
    {
      name: "Insta360 Luna Ultra",
      href: "https://www.insta360.com/product/insta360-luna-ultra",
      note: e.gimbalNote,
    },
  ];
}

function photographySections(dict: Dictionary) {
  const s = dict.photography.sections;
  return [
    { id: "story", label: s.story },
    { id: "equipment", label: s.equipment },
    { id: "gallery", label: s.gallery },
  ];
}

export default function PhotographyView({ dict }: { dict: Dictionary; locale?: Locale }) {
  const t = dict.photography;

  return (
    <main className="site-page">
      <SectionSidebar sections={photographySections(dict)} />
      <div className="site-page-inner flex flex-col gap-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className={`${TEXT_DISPLAY_LG} text-on-surface mb-2`}>{t.heading}</h1>
            <p className="font-mono text-[13px] tracking-widest text-on-surface-variant uppercase">
              {t.subtitle}
            </p>
          </div>
          <p className="hidden font-mono text-[14px] text-outline md:block">
            {t.statusLabel} <span className="text-primary-fixed">{t.statusOnline}</span>
          </p>
        </header>

        <div id="story">
        <TerminalWindow title={<DecryptedText text={t.storyTitle} animateOn="view" sequential speed={100} revealDirection="start" />} bodyClassName="p-6 md:p-8">
          <p className="font-sans text-[16px] leading-relaxed text-on-surface mb-3">
            {t.storyOne}
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-on-surface-variant">
            {t.storyTwo}
          </p>
        </TerminalWindow>
        </div>

        <section id="equipment" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {equipment(dict).map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-border flex flex-col gap-2 rounded-lg border border-outline-variant bg-surface p-6 transition-colors"
            >
              <span className={`${TEXT_LABEL_CAPS} text-on-surface-variant`}>{t.currentGear}</span>
              <h3 className="font-sans text-[17px] font-semibold text-on-surface">{item.name}</h3>
              <p className="font-sans text-[14px] text-on-surface-variant">{item.note}</p>
              <span className="mt-2 font-mono text-[12px] tracking-[0.14em] text-primary-fixed uppercase">
                {t.openOfficialPage}
              </span>
            </a>
          ))}
        </section>

        <section id="gallery" className="flex flex-col gap-4">
          <h2 className={`${TEXT_HEADLINE_MD} text-on-surface border-b border-outline-variant pb-2`}>
            {t.galleryHeading}
          </h2>
          {portfolioPhotos.length ? (
            <Masonry
              items={portfolioPhotos(dict)}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.95}
              blurToFocus
              colorShiftOnHover={false}
            />
          ) : (
            <p className="font-sans text-[15px] text-on-surface-variant">
              {t.galleryUnavailable}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
