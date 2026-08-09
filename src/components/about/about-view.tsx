import Image from "next/image";
import Link from "next/link";
import { join } from "node:path";

import DecryptedText from "@/components/ui/decrypted-text";
import SectionSidebar from "@/components/navigation/section-sidebar";
import TerminalWindow from "@/components/ui/terminal-window";
import { CameraIcon } from "@/components/ui/icon";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { readJpegSize } from "@/lib/jpeg-size";
import { TEXT_DISPLAY_LG, TEXT_HEADLINE_MD } from "@/lib/typography";

// School names and dates are data, not layout, so they are read out of the
// dictionary rather than duplicated per locale.
function educationTimeline(dict: Dictionary) {
  const e = dict.about.education;
  return [
    { date: e.present, title: e.degree, detail: e.yeditepe, current: true },
    { date: "2021 — 2022", title: e.prep, detail: e.yeditepe },
    { date: "2019 — 2021", title: e.highSchool, detail: e.bahcesehir },
    { date: "2017 — 2019", title: e.highSchool, detail: e.anatolian },
    { date: "2013 — 2017", title: e.middleSchool, detail: e.lulemiddle },
    { date: "2008 — 2013", title: e.elementary, detail: e.luleelementary },
  ];
}

// Exam names stay in English: these are the certifications' actual titles and
// what a reader would search for. Only the descriptions are translated.
function preparingFor(dict: Dictionary) {
  const p = dict.about.preparing;
  return [
    { name: "CompTIA Security+", detail: p.securityPlus },
    { name: "Blue Team Level 1 (BTL1)", detail: p.btl1 },
    { name: "ISO/IEC 27001 Foundation", detail: p.iso27001 },
    { name: "IELTS", detail: p.ielts },
  ];
}

function aboutSections(dict: Dictionary) {
  const s = dict.about.sections;
  return [
    { id: "biography", label: s.biography },
    { id: "education", label: s.education },
    { id: "preparing", label: s.preparing },
  ];
}

// Drawn from TECH-INVENTORY.md. Tool and language names are proper nouns, so
// the list is identical in both locales and stays out of the dictionary.
const techStack = [
  "Zero Trust", "Linux", "Docker", "Cloudflare", "Tailscale", "Pi-hole", "n8n",
  "Nmap", "Nuclei", "OWASP ZAP", "Go", "TypeScript", "Next.js", "PostgreSQL",
];

const PHOTOGRAPHY_CARD_IMAGE = "/images/portfolio/1.JPG";
const photographyCardSize = readJpegSize(
  join(process.cwd(), "public", "images", "portfolio", "1.JPG"),
) ?? { width: 1200, height: 800 };

export default function AboutView({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.about;

  return (
    <main className="site-page">
      <SectionSidebar sections={aboutSections(dict)} />
      <div className="site-page-inner">
        <header className="mb-10">
          <h1 className={`${TEXT_DISPLAY_LG} text-primary-fixed mb-4`}>
            <DecryptedText text={t.heading} animateOn="view" sequential speed={100} revealDirection="start" />
          </h1>
          <p className="font-mono text-[14px] text-on-surface-variant">
            {t.status}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="flex flex-col gap-6 lg:col-span-8">
            <div id="biography">
            <TerminalWindow title="./biography.sh" bodyClassName="p-6 md:p-8">
              <h2 className={`${TEXT_HEADLINE_MD} text-primary-fixed mb-4`}>
                <DecryptedText text={t.biographyHeading} animateOn="view" sequential speed={100} revealDirection="start" />
              </h2>
              <p className="font-sans text-[18px] leading-relaxed text-on-surface mb-4">
                {t.biographyOne}
              </p>
              <p className="font-sans text-[16px] leading-relaxed text-on-surface-variant">
                {t.biographyTwo}
              </p>
            </TerminalWindow>
            </div>

            <div id="education" className="rounded-lg border border-outline-variant bg-surface p-6 md:p-8">
              <h2 className={`${TEXT_HEADLINE_MD} text-on-surface mb-6 border-b border-outline-variant pb-2`}>
                {t.educationHeading}
              </h2>
              <div className="ml-3 space-y-8 border-l border-primary-fixed/30 pl-6">
                {educationTimeline(dict).map((item) => (
                  <div key={item.date} className="relative">
                    <div
                      className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-surface ${
                        item.current ? "bg-primary-fixed" : "bg-surface-variant"
                      }`}
                    />
                    <h3
                      className={`font-mono text-[14px] mb-1 ${item.current ? "text-primary-fixed" : "text-on-surface-variant"}`}
                    >
                      {item.date}
                    </h3>
                    <p className="font-sans text-[18px] font-medium text-on-surface">{item.title}</p>
                    <p className="font-sans text-[16px] text-on-surface-variant">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="preparing" className="rounded-lg border border-outline-variant bg-surface p-6 md:p-8">
              <h2 className={`${TEXT_HEADLINE_MD} text-on-surface mb-2 border-b border-outline-variant pb-2`}>
                {t.preparingHeading}
              </h2>
              <p className="mb-6 font-sans text-[15px] leading-relaxed text-on-surface-variant">
                {t.preparingIntro}
              </p>

              <ul className="flex flex-col gap-3">
                {preparingFor(dict).map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-col gap-2 rounded border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-sans text-[16px] font-medium text-on-surface">{item.name}</span>
                      <span className="font-sans text-[14px] leading-relaxed text-on-surface-variant">
                        {item.detail}
                      </span>
                    </div>
                    <span className="shrink-0 font-mono text-[12px] tracking-[0.1em] text-primary-fixed uppercase">
                      {t.inProgress}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <aside className="flex flex-col gap-6 lg:col-span-4">
            <div id="stack" className="rounded-lg border border-outline-variant bg-surface-container-low p-6">
              <h2 className={`${TEXT_HEADLINE_MD} text-on-surface mb-4`}>{t.techStackHeading}</h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-outline-variant bg-surface-variant px-3 py-1 font-mono text-[12px] tracking-[0.1em] text-on-surface uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={localizePath("/photography", locale)}
              className="group flex flex-col rounded-lg border border-outline-variant bg-surface p-6 transition-colors hover:border-primary-fixed"
            >
              <h2 className={`${TEXT_HEADLINE_MD} text-on-surface mb-4 flex items-center gap-2`}>
                <CameraIcon className="h-5 w-5 text-primary-fixed" />
                {t.photographyCardTitle}
              </h2>
              <p className="font-sans text-[16px] text-on-surface-variant mb-4">
                {t.photographyCardBody}
              </p>
              <div className="mt-auto overflow-hidden rounded border border-outline-variant">
                <Image
                  src={PHOTOGRAPHY_CARD_IMAGE}
                  alt=""
                  width={photographyCardSize.width}
                  height={photographyCardSize.height}
                  sizes="(min-width: 1024px) 340px, 100vw"
                  className="h-auto w-full grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
