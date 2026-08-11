import Link from "next/link";

import TerminalWindow from "@/components/ui/terminal-window";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { TEXT_DISPLAY_LG, TEXT_HEADLINE_MD, TEXT_LABEL_CAPS } from "@/lib/typography";

const CARD_CLASS_NAME =
  "glow-border flex flex-col gap-3 rounded-lg border border-outline-variant bg-surface p-6 transition-colors";

const SECTION_HEADING_CLASS_NAME = `${TEXT_HEADLINE_MD} text-on-surface border-b border-outline-variant pb-2`;

const BODY_CLASS_NAME = "font-sans text-[16px] leading-relaxed text-on-surface-variant";

const TERM_CLASS_NAME = "font-mono text-[14px] text-on-surface";

// Figures stay as numerals in both locales; only their labels translate.
function glance(dict: Dictionary) {
  const g = dict.incident.glance;
  return [
    { value: "35", label: g.undetected },
    { value: "23,000+", label: g.denied },
    { value: "0", label: g.alerts },
  ];
}

function causes(dict: Dictionary) {
  const c = dict.incident.causes;
  return [
    { index: "01", title: c.noSignalTitle, detail: c.noSignalDetail },
    { index: "02", title: c.noWatchTitle, detail: c.noWatchDetail },
    { index: "03", title: c.misleadingTitle, detail: c.misleadingDetail },
  ];
}

export default function IncidentView({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.incident;

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

          <h1 className={`${TEXT_DISPLAY_LG} break-words text-primary-fixed`}>{t.heading}</h1>

          <p className="max-w-3xl font-sans text-[17px] leading-relaxed text-on-surface-variant">
            {t.intro}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] tracking-[0.1em] text-on-surface-variant/70 uppercase">
            <span>{t.roleMeta}</span>
            <span>{t.dateMeta}</span>
            <span className="text-primary-fixed">{t.statusMeta}</span>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {glance(dict).map((item) => (
            <div key={item.label} className={CARD_CLASS_NAME}>
              <span className={`${TEXT_LABEL_CAPS} text-on-surface-variant`}>{item.label}</span>
              <span className="font-mono text-[28px] leading-none font-bold text-primary-fixed">
                {item.value}
              </span>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.symptomHeading}</h2>
          <p className={BODY_CLASS_NAME}>
            {t.symptomBody}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.invisibleHeading}</h2>
          <p className={BODY_CLASS_NAME}>
            {t.invisibleIntro}
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {causes(dict).map((cause) => (
              <div key={cause.index} className={CARD_CLASS_NAME}>
                <span className={`${TEXT_LABEL_CAPS} text-primary-fixed`}>{cause.index}</span>
                <h3 className="font-sans text-[17px] font-semibold text-on-surface">{cause.title}</h3>
                <p className="font-sans text-[14px] leading-relaxed text-on-surface-variant">
                  {cause.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.rootCauseHeading}</h2>
          <p className={BODY_CLASS_NAME}>
            {t.rootCauseOne}
          </p>
          <p className={BODY_CLASS_NAME}>
            {t.rootCauseTwo}
          </p>
          <p className={BODY_CLASS_NAME}>
            {t.rootCauseThree}
          </p>
          <p className={BODY_CLASS_NAME}>
            {t.rootCauseFour}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.fixHeading}</h2>
          <p className={BODY_CLASS_NAME}>
            {t.fixOne}
          </p>
          <p className={BODY_CLASS_NAME}>
            {t.fixTwo}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.changedHeading}</h2>
          <p className={BODY_CLASS_NAME}>
            {t.changedOne}
          </p>
          <p className={BODY_CLASS_NAME}>
            {t.changedTwo}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={SECTION_HEADING_CLASS_NAME}>{t.ruleHeading}</h2>
          <TerminalWindow title="root@lab:~" bodyClassName="p-6 md:p-8 flex flex-col gap-3">
            <p className="font-mono text-[15px] leading-relaxed text-primary-fixed">
              {t.ruleLine}
            </p>
            <p className="font-mono text-[14px] leading-relaxed text-on-surface-variant">
              {t.ruleBody}
            </p>
          </TerminalWindow>
          <p className={BODY_CLASS_NAME}>
            {t.ruleAftermath}
          </p>
        </section>

        <nav className="border-t border-outline-variant pt-6">
          <Link
            href={localizePath("/cyber-security", locale)}
            className="rounded-sm border border-outline-variant px-4 py-3 font-mono text-[14px] text-on-surface transition-colors hover:border-primary-fixed hover:text-primary-fixed"
          >
            {t.backLink}
          </Link>
        </nav>
      </div>
    </main>
  );
}
