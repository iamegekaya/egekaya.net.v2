import type { Metadata } from "next";
import SplitReveal from "@/components/about/split-reveal";
import ContactForm from "@/components/contact/contact-form";
import GlassPanel from "@/components/ui/glass-panel";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";

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
    description:
      "Get in touch for collaborations or just to say hi. Email: iamegekaya@egekaya.net.",
    images: twitterImage,
  },
};

export default function ContactPage() {
  return (
    <main className="site-page">
      <section className="w-[min(1120px,100%)]">
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="content-start">
            <GlassPanel>
              <p className="site-page-eyebrow">Contact</p>
              <SplitReveal
                as="h1"
                text="Get in Touch"
                className="site-page-title max-w-none"
              />
              <p className="mt-6 text-[1rem] leading-7 text-[rgba(245,247,242,0.76)]">
                Feel free to reach out for collaborations or just to say hi.
              </p>

              <a
                href="mailto:iamegekaya@egekaya.net"
                className="mt-8 inline-flex rounded-2xl border border-[rgba(255,245,224,0.12)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[1rem] font-medium text-[var(--foreground)] transition-colors hover:border-[rgba(65,176,110,0.32)] hover:text-[var(--accent)]"
              >
                iamegekaya@egekaya.net
              </a>
            </GlassPanel>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
