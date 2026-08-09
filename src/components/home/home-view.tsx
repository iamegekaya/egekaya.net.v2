import Image from "next/image";
import Link from "next/link";

import DecryptedText from "@/components/ui/decrypted-text";
import TerminalHero from "@/components/home/terminal-hero";
import { CameraIcon, TerminalIcon } from "@/components/ui/icon";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

// Decorative fill for the Security card's background -- a fixed string rather
// than Math.random(): the mockup generated this with a synchronous
// `document.write`, which doesn't exist in React. Since it's pure decoration
// (aria-hidden, no information conveyed), a static string avoids a
// server/client hydration mismatch for zero visual difference.
const HEX_DUMP =
  "790082998EC2CAAD48764F67C631A0436C421A3F7606054003EC342397B94A42FDE71B3CA2855F61C6F8D080CBD1D2F0AE4F6E9B36AAE0984C89A020BE11037C23275DE742FE302E09FA3978079491C6D973833FA250814AFED28D667748F6D195565F0E174A7152C55EA228817691BA65A08F863841982F778689EA10FA87A9806884F8983497C0A929061E85D76CA88C5AED1D0456F0EDF96F83A02E7E0F340F85CF7025DFA5E46888";

/**
 * The home page body, shared by /(site)/page.tsx and /tr/page.tsx.
 *
 * The two locales get thin route files that supply metadata and a dictionary;
 * the markup lives here once so a layout change cannot land on one language
 * and miss the other.
 */
export default function HomeView({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.home;

  return (
    <main className="site-page">
      <div className="site-page-inner flex flex-col gap-16">
        {/* The terminal caps at max-w-3xl (768px) inside a 1200px column, which
            left roughly 400px of dead space to its right on wide screens. The
            portrait fills it at lg and above; below that it stacks underneath,
            where it gets the full width and its overlay text stays readable. */}
        <section className="flex min-h-[50vh] flex-col justify-center">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
            <TerminalHero dict={dict} />

            <figure className="overflow-hidden rounded-lg border border-outline-variant">
              <Image
                src="/images/surveillance-portrait.jpg"
                alt={t.portraitAlt}
                width={2238}
                height={1888}
                priority
                sizes="(min-width: 1024px) 380px, 100vw"
                className="h-auto w-full"
              />
            </figure>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link href={localizePath("/cyber-security", locale)} className="group flex flex-col gap-4">
            <div className="flex items-end justify-between border-b border-outline-variant pb-2">
              <h2 className="font-mono text-[22px] uppercase tracking-wider text-primary-fixed">
                <DecryptedText
                  text={t.securityHeading}
                  animateOn="view"
                  sequential
                  speed={100}
                  revealDirection="start"
                />
              </h2>
              <TerminalIcon className="h-5 w-5 text-outline-variant transition-colors group-hover:text-primary-fixed" />
            </div>
            <div className="glow-border relative flex h-72 flex-col justify-end overflow-hidden rounded border border-transparent bg-surface p-6 transition-colors">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 select-none overflow-hidden break-words p-4 font-mono text-[10px] text-primary-fixed"
              >
                {HEX_DUMP}
              </div>
              <div className="relative z-10 border border-outline-variant/50 bg-background/80 p-4 backdrop-blur-sm">
                <div className="mb-3 flex gap-2">
                  {/* Left untranslated: both are the industry terms, and the
                      Turkish security field uses them as-is. */}
                  <span className="rounded-sm border border-outline-variant/50 bg-surface-container-high px-2 py-1 font-mono text-[11px] tracking-[0.1em] text-on-surface-variant uppercase">
                    Zero Trust
                  </span>
                  <span className="rounded-sm border border-outline-variant/50 bg-surface-container-high px-2 py-1 font-mono text-[11px] tracking-[0.1em] text-on-surface-variant uppercase">
                    SecOps
                  </span>
                </div>
                <h3 className="mb-2 font-sans text-[18px] text-on-surface">{t.infrastructureTitle}</h3>
                <p className="flex items-center gap-2 font-mono text-[14px] text-on-surface-variant">
                  <span className="text-primary-fixed">&gt;</span> {t.viewArchitecture}
                </p>
              </div>
            </div>
          </Link>

          <Link
            href={localizePath("/photography", locale)}
            className="group mt-0 flex flex-col gap-4 md:mt-8"
          >
            <div className="flex items-end justify-between border-b border-outline-variant pb-2">
              <h2 className="font-mono text-[22px] uppercase tracking-wider text-on-surface transition-colors group-hover:text-primary-fixed">
                <DecryptedText
                  text={t.photographyHeading}
                  animateOn="view"
                  sequential
                  speed={100}
                  revealDirection="start"
                />
              </h2>
              <CameraIcon className="h-5 w-5 text-outline-variant transition-colors group-hover:text-primary-fixed" />
            </div>
            <div className="glow-border relative flex h-72 flex-col justify-end overflow-hidden rounded border border-transparent bg-surface p-6 transition-colors">
              <div className="absolute inset-0 flex items-center justify-center opacity-30 transition-opacity duration-700 group-hover:opacity-100">
                <div className="relative flex h-20 w-32 items-center justify-center border border-on-surface-variant">
                  <div className="h-12 w-12 rounded-full border border-primary-fixed" />
                  <div className="absolute top-1 right-2 h-2 w-2 rounded-full bg-error" />
                </div>
              </div>
              <div className="relative z-10 mt-auto flex items-end justify-between">
                <h3 className="font-sans text-[18px] text-on-surface">{t.visualPerspectives}</h3>
                <span className="flex flex-col items-end gap-0.5 font-mono text-[10px] tracking-widest text-on-surface-variant uppercase">
                  <span>Fujifilm X-M5</span>
                  <span>Insta360 Luna Ultra</span>
                </span>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
