import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import TerminalWindow from "@/components/ui/terminal-window";
import { CameraIcon } from "@/components/ui/icon";
import { openGraphImage, openGraphSiteDefaults, twitterImage } from "@/lib/seo-image";
import { TEXT_DISPLAY_LG, TEXT_HEADLINE_MD } from "@/lib/typography";

export const metadata: Metadata = {
  title: "About",
  description:
    "Personal background, education, and interests of Ege Kaya — born 2003 in Lüleburgaz, cyber security engineer and photographer based in Istanbul.",
  alternates: { canonical: "/about" },
  openGraph: {
    ...openGraphSiteDefaults,
    title: "About — Ege Kaya",
    description:
      "Personal background, education, and interests of Ege Kaya — cyber security engineer and photographer.",
    url: "/about",
    type: "profile",
    images: openGraphImage,
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Ege Kaya",
    description:
      "Personal background, education, and interests — cyber security engineer and photographer.",
    images: twitterImage,
  },
};

const educationTimeline = [
  { date: "2022 — Present", title: "B.S. Cybersecurity", detail: "Yeditepe University", current: true },
  { date: "2021 — 2022", title: "Preparatory School", detail: "Yeditepe University" },
  { date: "2019 — 2021", title: "High School", detail: "Lüleburgaz Bahçeşehir Anatolian High School" },
  { date: "2017 — 2019", title: "High School", detail: "Lüleburgaz Anatolian High School" },
  { date: "2013 — 2017", title: "Middle School", detail: "Lüleburgaz Middle School" },
  { date: "2008 — 2013", title: "Elementary School", detail: "Lüleburgaz Elementary School" },
];

const techStack = ["Zero Trust", "Docker", "Cloudflare", "n8n", "Tailscale", "Python"];

export default function AboutPage() {
  return (
    <main className="site-page">
      <div className="site-page-inner">
        <header className="mb-10">
          <h1 className={`${TEXT_DISPLAY_LG} text-primary-fixed mb-4`}>whoami</h1>
          <p className="font-mono text-[14px] text-on-surface-variant">
            [STATUS]: B.S. CYBERSECURITY — YEDITEPE UNIVERSITY, 2022–PRESENT
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="flex flex-col gap-6 lg:col-span-8">
            <TerminalWindow title="./biography.sh" bodyClassName="p-6 md:p-8">
              <h2 className={`${TEXT_HEADLINE_MD} text-primary-fixed mb-4`}>&gt; ./biography.sh</h2>
              <p className="font-sans text-[18px] leading-relaxed text-on-surface mb-4">
                Hello! My name is Ege, and I am 22 years old. I was born on July 11, 2003, in the Lüleburgaz
                district of Kırklareli. I am part of the last generation that grew up playing soccer in the
                streets and playing cards and marbles.
              </p>
              <p className="font-sans text-[16px] leading-relaxed text-on-surface-variant">
                I first encountered my first computer in 2011; since that day, technology has become an
                integral part of my life. My interest in technology deepened during university, and in short,
                I enjoy working with technology, creating things, and learning something new every day. Outside
                of that I follow Formula 1, support Fenerbahçe, and like exploring cities and museums.
              </p>
            </TerminalWindow>

            <div className="rounded-lg border border-outline-variant bg-surface p-6 md:p-8">
              <h2 className={`${TEXT_HEADLINE_MD} text-on-surface mb-6 border-b border-outline-variant pb-2`}>
                Education Timeline
              </h2>
              <div className="ml-3 space-y-8 border-l border-primary-fixed/30 pl-6">
                {educationTimeline.map((item) => (
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
          </section>

          <aside className="flex flex-col gap-6 lg:col-span-4">
            <div className="rounded-lg border border-outline-variant bg-surface-container-low p-6">
              <h2 className={`${TEXT_HEADLINE_MD} text-on-surface mb-4`}>Tech_Stack</h2>
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
              href="/photography"
              className="group flex flex-col rounded-lg border border-outline-variant bg-surface p-6 transition-colors hover:border-primary-fixed"
            >
              <h2 className={`${TEXT_HEADLINE_MD} text-on-surface mb-4 flex items-center gap-2`}>
                <CameraIcon className="h-5 w-5 text-primary-fixed" />
                Photography
              </h2>
              <p className="font-sans text-[16px] text-on-surface-variant mb-4">
                Capturing the unseen details. My work focuses on street and travel photography, an escape from
                the screen and a way to pay attention to what is around me.
              </p>
              <div className="mt-auto overflow-hidden rounded border border-outline-variant">
                <Image
                  src="/images/portfolio/1.JPG"
                  alt=""
                  width={480}
                  height={320}
                  sizes="(min-width: 1024px) 340px, 100vw"
                  className="h-48 w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
