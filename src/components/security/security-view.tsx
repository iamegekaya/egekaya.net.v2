import Link from "next/link";

import DecryptedText from "@/components/ui/decrypted-text";
import SectionSidebar from "@/components/navigation/section-sidebar";
import TerminalWindow from "@/components/ui/terminal-window";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import {
  activeSystems,
  architectureSections,
  internshipWork,
  operatingSystemExperience,
  securityPrinciples,
} from "@/lib/cyber-security-content";
import { projectSlots } from "@/lib/projects-content";
import { TEXT_DISPLAY_LG, TEXT_HEADLINE_MD, TEXT_LABEL_CAPS } from "@/lib/typography";

const CARD_CLASS_NAME =
  "glow-border flex flex-col gap-4 rounded-lg border border-outline-variant bg-surface p-6 transition-colors";

const SYSTEM_LIST_CLASS_NAME = "mt-auto flex flex-col gap-2";

// Shared by the system lists and the architecture bullets so the two read as
// one kind of terminal-style entry.
const SYSTEM_ITEM_CLASS_NAME =
  "rounded border border-outline-variant/60 bg-surface-container-lowest px-3 py-2 font-mono text-[13px] leading-relaxed text-on-surface-variant";

function securitySections(dict: Dictionary) {
  const s = dict.security.sections;
  return [
    { id: "principles", label: s.principles },
    { id: "systems", label: s.systems },
    { id: "architecture", label: s.architecture },
    { id: "projects", label: s.projects },
    { id: "experience", label: s.experience },
  ];
}

export default function SecurityView({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.security;

  return (
    <main className="site-page">
      <SectionSidebar ariaLabel={dict.sidebar.onThisPage} sections={securitySections(dict)} />
      <div className="site-page-inner flex flex-col gap-10">
        <header className="flex flex-col gap-4">
          <h1 className={`${TEXT_DISPLAY_LG} text-primary-fixed`}>
            <DecryptedText text={t.heading} animateOn="view" sequential speed={100} revealDirection="start" />
          </h1>
          <p className="max-w-2xl font-sans text-[16px] leading-relaxed text-on-surface-variant">
            {t.intro}
          </p>
        </header>

        <section id="principles" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {securityPrinciples(dict).map((item) => (
            <div key={item.value} className={CARD_CLASS_NAME}>
              <div className="flex items-start justify-between">
                <span className={`${TEXT_LABEL_CAPS} text-on-surface-variant`}>{item.label}</span>
              </div>
              <h3 className="font-sans text-[20px] font-semibold text-on-surface">{item.value}</h3>
              <p className="font-sans text-[14px] leading-relaxed text-on-surface-variant">{item.detail}</p>
            </div>
          ))}
        </section>

        <section id="systems" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className={CARD_CLASS_NAME}>
            <h2 className={`${TEXT_HEADLINE_MD} text-on-surface border-b border-outline-variant pb-2`}>
              {t.activeSystemsHeading}
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-on-surface-variant">
              {t.activeSystemsIntro}
            </p>
            <ul className={SYSTEM_LIST_CLASS_NAME}>
              {activeSystems(dict).map((system) => (
                <li key={system} className={SYSTEM_ITEM_CLASS_NAME}>
                  {system}
                </li>
              ))}
            </ul>
          </div>

          <div className={CARD_CLASS_NAME}>
            <h2 className={`${TEXT_HEADLINE_MD} text-on-surface border-b border-outline-variant pb-2`}>
              {t.systemExperienceHeading}
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-on-surface-variant">
              {t.systemExperienceIntro}
            </p>
            <ul className={SYSTEM_LIST_CLASS_NAME}>
              {operatingSystemExperience(dict).map((system) => (
                <li key={system} className={SYSTEM_ITEM_CLASS_NAME}>
                  {system}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="architecture" className="flex flex-col gap-6">
          <h2 className={`${TEXT_HEADLINE_MD} text-on-surface border-b border-outline-variant pb-2`}>
            {t.architectureHeading}
          </h2>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {architectureSections(dict).map((section) => (
              <div key={section.slug} id={section.slug} className={`${CARD_CLASS_NAME} scroll-mt-32`}>
                <span className={`${TEXT_LABEL_CAPS} text-primary-fixed`}>{section.index}</span>
                <h3 className="font-sans text-[19px] font-semibold text-on-surface">{section.title}</h3>
                <p className="font-sans text-[15px] leading-relaxed text-on-surface-variant">{section.intro}</p>
                <ul className="flex flex-col gap-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className={SYSTEM_ITEM_CLASS_NAME}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="flex flex-col gap-4">
          <h2 className={`${TEXT_HEADLINE_MD} text-on-surface border-b border-outline-variant pb-2`}>
            {t.projectsHeading}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectSlots(dict, locale).map((project) => (
              <div key={project.slot} className={`${CARD_CLASS_NAME} min-h-[220px] justify-between`}>
                <div className="flex items-start justify-between">
                  <span className={`${TEXT_LABEL_CAPS} text-on-surface-variant`}>{project.slot}</span>
                  <span
                    className={`font-mono text-[13px] ${project.href ? "text-primary-fixed" : "text-on-surface-variant"}`}
                  >
                    {project.state}
                  </span>
                </div>

                {project.title ? (
                  <h3 className="font-sans text-[18px] font-semibold text-on-surface">{project.title}</h3>
                ) : null}

                <p className="font-sans text-[14px] leading-relaxed text-on-surface-variant">
                  {project.summary}
                </p>

                {project.tags.length > 0 ? (
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded border border-outline-variant/60 px-2 py-1 font-mono text-[11px] text-on-surface-variant"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {project.href ? (
                  <Link
                    href={project.href}
                    className="rounded-sm border border-primary-fixed bg-primary-fixed/10 px-4 py-2 text-center font-mono text-[13px] text-on-surface transition-colors hover:bg-primary-fixed/20 hover:text-primary-fixed"
                  >
                    {t.openWriteUp}
                  </Link>
                ) : (
                  <span className="cursor-not-allowed border border-outline-variant px-4 py-2 text-center font-mono text-[13px] text-on-surface-variant">
                    {t.encrypted}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-outline-variant bg-surface p-6 md:p-8">
            <span className={`${TEXT_LABEL_CAPS} text-primary-fixed`}>{t.experienceLabel}</span>
            <h2 className="mt-4 font-sans text-[20px] font-semibold text-on-surface">{t.employer}</h2>
            <p className="mt-2 font-sans text-[16px] font-medium text-on-surface-variant">
              {t.role}
            </p>
            <p className="mt-3 font-mono text-[12px] tracking-[0.1em] text-on-surface-variant/70 uppercase">
              {t.period}
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {internshipWork(dict).map((item) => (
                <li key={item.area} className="flex flex-col gap-1">
                  <span className="font-mono text-[13px] tracking-[0.05em] text-primary-fixed">
                    &gt; {item.area}
                  </span>
                  <span className="font-sans text-[15px] leading-relaxed text-on-surface-variant">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className={`${CARD_CLASS_NAME} gap-4`}>
              <span className={`${TEXT_LABEL_CAPS} text-primary-fixed`}>{t.liveProduct}</span>
              <h2 className="font-sans text-[20px] font-semibold text-on-surface">OmniSight</h2>
              <p className="font-sans text-[15px] leading-relaxed text-on-surface-variant">
                {t.omnisightBlurb}
              </p>
              <a
                href="https://omnisight.info"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex w-fit items-center gap-2 rounded-sm border border-primary-fixed bg-primary-fixed/10 px-4 py-2.5 font-mono text-[13px] text-on-surface transition-colors hover:bg-primary-fixed/20 hover:text-primary-fixed"
              >
                omnisight.info
                <span aria-hidden="true">&#8599;</span>
                <span className="sr-only">{t.opensInNewTab}</span>
              </a>
            </div>

            <TerminalWindow title="root@sec_photo:~" bodyClassName="p-6 md:p-8 flex flex-col justify-end min-h-[180px]">
              <p className="font-mono text-[14px] text-primary-fixed/80">{t.terminal.init}</p>
              <p className="font-mono text-[14px] text-primary-fixed/80">{t.terminal.compiling}</p>
              <p className="font-mono text-[14px] text-primary-fixed/80">{t.terminal.loading}</p>
              <p className="font-mono text-[14px] text-primary-fixed">
                {t.terminal.awaiting}
                <span className="terminal-cursor ml-1" />
              </p>
            </TerminalWindow>
          </div>
        </section>
      </div>
    </main>
  );
}
