import Image from "next/image";
import Link from "next/link";

import PrivacyBoundaryFigure from "@/components/omnisight/privacy-boundary-figure";
import TerminalWindow from "@/components/ui/terminal-window";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { TEXT_DISPLAY_LG, TEXT_HEADLINE_MD, TEXT_LABEL_CAPS } from "@/lib/typography";

const CARD_CLASS_NAME =
  "glow-border flex flex-col gap-3 rounded-lg border border-outline-variant bg-surface p-6 transition-colors";

const SECTION_HEADING_CLASS_NAME = `${TEXT_HEADLINE_MD} text-on-surface border-b border-outline-variant pb-2`;

const BODY_CLASS_NAME = "font-sans text-[16px] leading-relaxed text-on-surface-variant";

const FIGURE_CAPTION_CLASS_NAME =
  "font-mono text-[12px] leading-relaxed tracking-[0.05em] text-on-surface-variant/70";

function components(dict: Dictionary) {
  const c = dict.omnisight.components;
  return [
    { name: c.agent, detail: c.agentDetail },
    { name: c.server, detail: c.serverDetail },
    { name: c.console, detail: c.consoleDetail },
    { name: c.controlPlane, detail: c.controlPlaneDetail },
    { name: c.vulnService, detail: c.vulnServiceDetail },
    { name: c.installers, detail: c.installersDetail },
  ];
}

function boundaries(dict: Dictionary) {
  const b = dict.omnisight.boundaries;
  return [
    { index: "01", title: b.metadataTitle, detail: b.metadataDetail },
    { index: "02", title: b.outboundTitle, detail: b.outboundDetail },
    { index: "03", title: b.failClosedTitle, detail: b.failClosedDetail },
  ];
}

export default function OmniSightView({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.omnisight;

  return (
    <main className="site-page">
      <div className="site-page-inner flex flex-col gap-10">
        <header className="flex flex-col gap-4">
          <Link
            href={localizePath("/cyber-security", locale)}
            className="font-mono text-[13px] text-on-surface-variant transition-colors hover:text-primary-fixed w-fit"
          >
            {t.backToProfile}
          </Link>

          <h1 className={`${TEXT_DISPLAY_LG} text-primary-fixed`}>{t.heading}</h1>

          <p className="max-w-3xl font-sans text-[17px] leading-relaxed text-on-surface-variant">
            {t.intro}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] tracking-[0.1em] text-on-surface-variant/70 uppercase">
            <span>{t.roleMeta}</span>
            <span>{t.stackMeta}</span>
            <span className="text-primary-fixed">{t.statusMeta}</span>
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.whatItDoesHeading}</h2>
          <p className={BODY_CLASS_NAME}>
            {t.whatItDoesBody}
          </p>

          <figure className="flex flex-col gap-3">
            <Image
              src="/images/omnisight/data-flow.png"
              alt={t.dataFlowAlt}
              width={2752}
              height={1536}
              className="rounded-lg border border-outline-variant"
              sizes="(max-width: 768px) 100vw, 900px"
            />
            <figcaption className={FIGURE_CAPTION_CLASS_NAME}>
              {t.dataFlowCaption}
            </figcaption>
          </figure>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {components(dict).map((component) => (
              <div key={component.name} className={CARD_CLASS_NAME}>
                <h3 className="font-sans text-[16px] font-semibold text-on-surface">{component.name}</h3>
                <p className="font-sans text-[14px] leading-relaxed text-on-surface-variant">
                  {component.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.boundariesHeading}</h2>
          <p className={BODY_CLASS_NAME}>
            {t.boundariesIntro}
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {boundaries(dict).map((boundary) => (
              <div key={boundary.index} className={CARD_CLASS_NAME}>
                <span className={`${TEXT_LABEL_CAPS} text-primary-fixed`}>{boundary.index}</span>
                <h3 className="font-sans text-[17px] font-semibold text-on-surface">{boundary.title}</h3>
                <p className="font-sans text-[14px] leading-relaxed text-on-surface-variant">
                  {boundary.detail}
                </p>
              </div>
            ))}
          </div>

          <figure className="mt-2 flex flex-col gap-3">
            <Image
              src="/images/omnisight/product-overview.png"
              alt={t.overviewAlt}
              width={2752}
              height={1536}
              className="rounded-lg border border-outline-variant"
              sizes="(max-width: 768px) 100vw, 900px"
            />
            <figcaption className={FIGURE_CAPTION_CLASS_NAME}>
              {t.overviewCaption}
            </figcaption>
          </figure>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.dataGoesHeading}</h2>
          <p className={BODY_CLASS_NAME}>
            {t.dataGoesBody}
          </p>

          <figure className="flex flex-col gap-3">
            <PrivacyBoundaryFigure />
            <figcaption className={FIGURE_CAPTION_CLASS_NAME}>
              {t.boundaryCaption}
            </figcaption>
          </figure>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.decisionsHeading}</h2>

          <h3 className="font-sans text-[18px] font-semibold text-on-surface">
            {t.restTitle}
          </h3>
          <p className={BODY_CLASS_NAME}>
            {t.restBodyOne}
          </p>
          <p className={BODY_CLASS_NAME}>
            {t.restBodyTwo}
          </p>

          <h3 className="mt-4 font-sans text-[18px] font-semibold text-on-surface">
            {t.withdrawTitle}
          </h3>
          <p className={BODY_CLASS_NAME}>
            {t.withdrawBody}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.differentlyHeading}</h2>
          <p className={BODY_CLASS_NAME}>
            {t.differentlyOne}
          </p>
          <p className={BODY_CLASS_NAME}>
            {t.differentlyTwo}
          </p>

          <TerminalWindow title="root@omnisight:~" bodyClassName="p-6 md:p-8 flex flex-col gap-3">
            <p className="font-mono text-[15px] leading-relaxed text-primary-fixed">
              {t.lessonLine}
            </p>
            <p className="font-mono text-[14px] leading-relaxed text-on-surface-variant">
              {t.lessonBody}
            </p>
          </TerminalWindow>
        </section>

        <nav className="flex flex-wrap gap-3 border-t border-outline-variant pt-6">
          <Link
            href={localizePath("/cyber-security", locale)}
            className="rounded-sm border border-outline-variant px-4 py-3 font-mono text-[14px] text-on-surface transition-colors hover:border-primary-fixed hover:text-primary-fixed"
          >
            {t.backLink}
          </Link>
          <Link
            href={localizePath("/cyber-security/silent-ingest-failure", locale)}
            className="rounded-sm border border-primary-fixed bg-primary-fixed/10 px-4 py-3 font-mono text-[14px] text-on-surface transition-colors hover:bg-primary-fixed/20 hover:text-primary-fixed"
          >
            {t.readIncident}
          </Link>
        </nav>
      </div>
    </main>
  );
}
