import Link from "next/link";

import LetterGlitch from "@/components/backgrounds/letter-glitch";
import GlassPanel from "@/components/ui/glass-panel";
import { SITE_GLITCH_COLORS } from "@/lib/site-palette";

// This file renders outside the (site) layout, so the background and the way
// back to the site have to be provided here rather than inherited.
export default function NotFound() {
  return (
    <div className="site-canvas">
      <div className="site-background" aria-hidden="true">
        <LetterGlitch
          glitchColors={SITE_GLITCH_COLORS}
          glitchSpeed={100}
          centerVignette
          outerVignette
          smooth
        />
      </div>

      <main className="site-page">
        <section className="w-[min(720px,100%)]">
          <GlassPanel>
            <p className="site-page-eyebrow">Error 404</p>
            <h1 className="site-page-title max-w-none">Page Not Found</h1>
            <p className="mt-6 text-[1rem] leading-7 text-[rgba(245,247,242,0.76)]">
              The page you are looking for does not exist or has been moved.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex rounded-2xl border border-[var(--accent-border-strong)] bg-[var(--accent-bg-soft)] px-4 py-3 text-[1rem] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-bg-hover)] hover:text-[var(--accent)]"
              >
                Back to home
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-2xl border border-[var(--surface-border-strong)] bg-[var(--surface-input-bg)] px-4 py-3 text-[1rem] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent-border-strong)] hover:text-[var(--accent)]"
              >
                Contact
              </Link>
            </div>
          </GlassPanel>
        </section>
      </main>
    </div>
  );
}
