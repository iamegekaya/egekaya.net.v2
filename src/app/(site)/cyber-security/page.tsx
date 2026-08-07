import type { Metadata } from "next";

import TerminalWindow from "@/components/ui/terminal-window";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";
import { TEXT_DISPLAY_LG, TEXT_HEADLINE_MD, TEXT_LABEL_CAPS } from "@/lib/typography";
import { architectureSections, securityPrinciples } from "@/lib/cyber-security-content";

export const metadata: Metadata = {
  title: "Cyber Security",
  description:
    "Zero Trust, hybrid Docker + native architecture, Cloudflare edge logging, SecOps automation with n8n + AI, Tailscale mesh VPN. Aktif Yatırım Bankası security intern.",
  alternates: { canonical: "/cyber-security" },
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

const projectSlots = [1, 2, 3];

const CARD_CLASS_NAME =
  "glow-border flex flex-col gap-4 rounded-lg border border-outline-variant bg-surface p-6 transition-colors";

export default function CyberSecurityPage() {
  return (
    <main className="site-page">
      <div className="site-page-inner flex flex-col gap-10">
        <header className="flex flex-col gap-4">
          <h1 className={`${TEXT_DISPLAY_LG} text-primary-fixed`}>&gt; ./SECURITY_PROFILE</h1>
          <p className="max-w-2xl font-sans text-[16px] leading-relaxed text-on-surface-variant">
            Cybersecurity is not just an area of interest for me, but a disciplined learning process and an
            architectural design mindset. I focus on understanding systems in depth, identifying
            vulnerabilities, and building structures around the Zero Trust principle — sitting at the
            intersection of system management, traffic analysis, defensive operations, and security automation.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {securityPrinciples.map((item) => (
            <div key={item.value} className={CARD_CLASS_NAME}>
              <div className="flex items-start justify-between">
                <span className={`${TEXT_LABEL_CAPS} text-on-surface-variant`}>{item.label}</span>
              </div>
              <h3 className="font-sans text-[20px] font-semibold text-on-surface">{item.value}</h3>
              <p className="font-sans text-[14px] leading-relaxed text-on-surface-variant">{item.detail}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-6">
          <h2 className={`${TEXT_HEADLINE_MD} text-on-surface border-b border-outline-variant pb-2`}>
            Technical Infrastructure &amp; Architecture
          </h2>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {architectureSections.map((section) => (
              <div key={section.slug} id={section.slug} className={`${CARD_CLASS_NAME} scroll-mt-32`}>
                <span className={`${TEXT_LABEL_CAPS} text-primary-fixed`}>{section.index}</span>
                <h3 className="font-sans text-[19px] font-semibold text-on-surface">{section.title}</h3>
                <p className="font-sans text-[15px] leading-relaxed text-on-surface-variant">{section.intro}</p>
                <ul className="flex flex-col gap-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded border border-outline-variant/60 bg-surface-container-lowest px-3 py-2 font-mono text-[13px] leading-relaxed text-on-surface-variant"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={`${TEXT_HEADLINE_MD} text-on-surface border-b border-outline-variant pb-2`}>
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectSlots.map((slot) => (
              <div key={slot} className={`${CARD_CLASS_NAME} min-h-[220px] justify-between`}>
                <div className="flex items-start justify-between">
                  <span className={`${TEXT_LABEL_CAPS} text-on-surface-variant`}>SLOT_{String(slot).padStart(2, "0")}</span>
                  <span className="font-mono text-[13px] text-on-surface-variant">[COMING SOON]</span>
                </div>
                <p className="font-sans text-[14px] leading-relaxed text-on-surface-variant">
                  Write-ups and tooling from CTFs and independent research will be published here once
                  they are ready.
                </p>
                <span className="cursor-not-allowed border border-outline-variant px-4 py-2 text-center font-mono text-[13px] text-on-surface-variant">
                  ENCRYPTED
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-outline-variant bg-surface p-6 md:p-8">
            <span className={`${TEXT_LABEL_CAPS} text-primary-fixed`}>Experience</span>
            <h2 className="mt-4 font-sans text-[20px] font-semibold text-on-surface">Aktif Yatırım Bankası A.Ş</h2>
            <p className="mt-2 font-sans text-[16px] font-medium text-on-surface-variant">
              Information Technologies Security Intern
            </p>
            <p className="mt-3 font-mono text-[12px] tracking-[0.1em] text-on-surface-variant/70 uppercase">
              July 2, 2025 – August 27, 2025
            </p>
            <p className="mt-6 font-sans text-[15px] leading-relaxed text-on-surface-variant">
              During this period, I developed active work around system management, web technologies, and
              security automations, while continuing to strengthen my Blue Team perspective.
            </p>
          </div>

          <TerminalWindow title="root@sec_photo:~" bodyClassName="p-6 md:p-8 flex flex-col justify-end min-h-[220px]">
            <p className="font-mono text-[14px] text-primary-fixed/80">Initializing security profile...</p>
            <p className="font-mono text-[14px] text-primary-fixed/80">Compiling principles... [OK]</p>
            <p className="font-mono text-[14px] text-primary-fixed/80">Loading real-world experience... [4 modules]</p>
            <p className="font-mono text-[14px] text-primary-fixed animate-pulse">Awaiting new write-ups_</p>
          </TerminalWindow>
        </section>
      </div>
    </main>
  );
}
