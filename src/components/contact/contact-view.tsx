import ContactForm from "@/components/contact/contact-form";
import DecryptedText from "@/components/ui/decrypted-text";
import { ArrowForwardIcon, KeyIcon } from "@/components/ui/icon";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { TEXT_DISPLAY_LG, TEXT_HEADLINE_MD, TEXT_LABEL_CAPS } from "@/lib/typography";

// External profile links: labels are proper nouns, so they stay identical in
// both locales and live here rather than in the dictionary.
const externalNodes = [
  { label: "GitHub", href: "https://github.com/iamegekaya" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iamegekaya/" },
  { label: "Instagram", href: "https://www.instagram.com/iamegekaya/" },
];

export default function ContactView({ dict }: { dict: Dictionary; locale?: Locale }) {
  const t = dict.contact;

  return (
    <main className="site-page">
      <div className="site-page-inner flex flex-col gap-10">
        <header>
          <h1 className={`${TEXT_DISPLAY_LG} text-primary-fixed mb-4`}><DecryptedText text={t.heading} animateOn="view" sequential speed={100} revealDirection="start" /></h1>
          <p className="max-w-2xl font-mono text-[14px] text-on-surface-variant">
            {t.intro}{" "}
            <a href="mailto:iamegekaya@egekaya.net" className="text-primary-fixed underline underline-offset-4">
              iamegekaya@egekaya.net
            </a>
            .
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7 lg:col-span-8">
            <ContactForm dict={dict} />
          </div>

          <div className="flex flex-col gap-6 md:col-span-5 lg:col-span-4">
            <div className="glow-border relative rounded-lg border border-outline-variant bg-surface p-6 transition-colors">
              <div className="absolute top-0 right-0 rounded-bl-sm border-b border-l border-outline-variant bg-surface-container px-2 py-1 font-mono text-[11px] text-primary-fixed">
                {t.onRequest}
              </div>
              <h3 className={`${TEXT_HEADLINE_MD} text-on-surface mb-4 flex items-center gap-2`}>
                <KeyIcon className="h-5 w-5 text-primary-fixed" />
                {t.pgpTitle}
              </h3>
              <p className="font-sans text-[14px] text-on-surface-variant">
                {t.pgpBody}
              </p>
            </div>

            <div className="rounded-lg border border-outline-variant bg-surface p-6">
              <h3 className={`${TEXT_LABEL_CAPS} text-primary-fixed mb-4 opacity-70`}>{t.externalNodes}</h3>
              <div className="flex flex-col gap-4">
                {externalNodes.map((node) => (
                  <a
                    key={node.label}
                    href={node.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between font-mono text-[14px] text-on-surface-variant transition-colors hover:text-primary-fixed"
                  >
                    <span>{node.label}</span>
                    <ArrowForwardIcon className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
