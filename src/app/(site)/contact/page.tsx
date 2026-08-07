import type { Metadata } from "next";

import ContactForm from "@/components/contact/contact-form";
import { ArrowForwardIcon, KeyIcon } from "@/components/ui/icon";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";
import { TEXT_DISPLAY_LG, TEXT_HEADLINE_MD, TEXT_LABEL_CAPS } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ege Kaya for collaborations, questions, or just to say hi. Email iamegekaya@egekaya.net or use the contact form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    ...openGraphSiteDefaults,
    title: "Contact — Ege Kaya",
    description:
      "Get in touch for collaborations or just to say hi. Email iamegekaya@egekaya.net or use the form.",
    url: "/contact",
    type: "website",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Ege Kaya",
    description: "Get in touch for collaborations or just to say hi. Email: iamegekaya@egekaya.net.",
    images: twitterImage,
  },
};

const externalNodes = [
  { label: "GitHub", href: "https://github.com/iamegekaya" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iamegekaya/" },
  { label: "Instagram", href: "https://www.instagram.com/iamegekaya/" },
];

export default function ContactPage() {
  return (
    <main className="site-page">
      <div className="site-page-inner flex flex-col gap-10">
        <header>
          <h1 className={`${TEXT_DISPLAY_LG} text-primary-fixed mb-4`}>{"// INITIATE_CONTACT"}</h1>
          <p className="max-w-2xl font-mono text-[14px] text-on-surface-variant">
            Secure transmission lines open. Whether for security consultations, photographic collaborations, or
            general inquiries, use the terminal below or reach out directly at{" "}
            <a href="mailto:iamegekaya@egekaya.net" className="text-primary-fixed underline underline-offset-4">
              iamegekaya@egekaya.net
            </a>
            .
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7 lg:col-span-8">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6 md:col-span-5 lg:col-span-4">
            <div className="glow-border relative rounded-lg border border-outline-variant bg-surface p-6 transition-colors">
              <div className="absolute top-0 right-0 rounded-bl-sm border-b border-l border-outline-variant bg-surface-container px-2 py-1 font-mono text-[11px] text-primary-fixed">
                [ON REQUEST]
              </div>
              <h3 className={`${TEXT_HEADLINE_MD} text-on-surface mb-4 flex items-center gap-2`}>
                <KeyIcon className="h-5 w-5 text-primary-fixed" />
                PGP Public Key
              </h3>
              <p className="font-sans text-[14px] text-on-surface-variant">
                For encrypted communications regarding security disclosures, ask for a current public key via
                the form or email above.
              </p>
            </div>

            <div className="rounded-lg border border-outline-variant bg-surface p-6">
              <h3 className={`${TEXT_LABEL_CAPS} text-primary-fixed mb-4 opacity-70`}>External_Nodes</h3>
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
