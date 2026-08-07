import Link from "next/link";

import TerminalWindow from "@/components/ui/terminal-window";
import { TEXT_DISPLAY_LG } from "@/lib/typography";

// Renders outside the (site) layout, so the background and the way back to
// the site are provided here rather than inherited.
export default function NotFound() {
  return (
    <div className="site-canvas">
      <div className="site-grid-bg" aria-hidden="true" />

      <main className="site-page">
        <div className="site-page-inner flex max-w-2xl flex-col">
          <TerminalWindow bodyClassName="p-6 md:p-8">
            <p className="font-mono text-[13px] tracking-[0.1em] text-primary-fixed uppercase">Error 404</p>
            <h1 className={`${TEXT_DISPLAY_LG} text-on-surface mt-2 mb-4`}>Page Not Found</h1>
            <p className="font-sans text-[16px] leading-relaxed text-on-surface-variant">
              The page you are looking for does not exist or has been moved.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-sm border border-primary-fixed bg-primary-fixed/10 px-4 py-3 font-mono text-[14px] text-on-surface transition-colors hover:bg-primary-fixed/20 hover:text-primary-fixed"
              >
                Back to home
              </Link>
              <Link
                href="/contact"
                className="rounded-sm border border-outline-variant px-4 py-3 font-mono text-[14px] text-on-surface transition-colors hover:border-primary-fixed hover:text-primary-fixed"
              >
                Contact
              </Link>
            </div>
          </TerminalWindow>
        </div>
      </main>
    </div>
  );
}
