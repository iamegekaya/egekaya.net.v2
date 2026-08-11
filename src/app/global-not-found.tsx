import type { Metadata } from "next";
import Link from "next/link";

import RootDocument from "@/components/site/root-document";
import TerminalWindow from "@/components/ui/terminal-window";
import { SITE_URL } from "@/lib/site-url";
import { TEXT_DISPLAY_LG, TEXT_LABEL_CAPS } from "@/lib/typography";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Page Not Found",
  description: "The requested page does not exist.",
};

// With two root layouts, an unmatched URL has no layout to inherit at all, so
// Next's global-not-found convention supplies the whole document. English is
// the default locale and a 404 has no route locale of its own to read.
//
// The trace-log framing comes from a Stitch mockup, rebuilt on the site's own
// tokens and components. The mockup shipped a Tailwind CDN script, Google Fonts
// links, and a single dead anchor; none of that survives the port.
export default function GlobalNotFound() {
  return (
    <RootDocument locale="en">
      <div className="site-canvas">
        <div className="site-grid-bg" aria-hidden="true" />

        <main className="site-page">
          <div className="site-page-inner flex max-w-2xl flex-col">
            <TerminalWindow title="SYSTEM_FAILURE_NODE_0x404" bodyClassName="p-6 md:p-8">
              <h1 className={`${TEXT_DISPLAY_LG} glitch-text text-on-surface`}>
                404 // ERROR_NOT_FOUND
              </h1>
              <p className={`${TEXT_LABEL_CAPS} text-primary-fixed mt-3`}>
                &gt; System warning: critical exception in sub-routine
              </p>

              <div className="border-outline-variant bg-surface-container-lowest mt-6 flex flex-col gap-2 rounded border px-4 py-4">
                <p className="font-sans text-[15px] leading-relaxed text-on-surface">
                  <span className="text-primary-fixed font-medium">Access denied:</span> the requested
                  node does not exist in this subnet.
                </p>
                <p className="font-mono text-[13px] leading-relaxed text-on-surface-variant">
                  &gt; TRACE: attempting to resolve path... <span className="text-error">[FAILED]</span>
                </p>
                <p className="font-mono text-[13px] leading-relaxed text-on-surface-variant">
                  &gt; REASON: dead link or unauthorized access vector.
                </p>
                {/* The prompt text is static; only the block cursor after it blinks.
                  Reuses .terminal-cursor, the same hard step-end blink the home
                  hero uses, rather than fading the whole line. aria-hidden so a
                  screen reader is not read a decorative prompt. */}
                <p className="font-mono text-[13px] text-primary-fixed" aria-hidden="true">
                  &gt; _<span className="terminal-cursor ml-1" />
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-sm border border-primary-fixed bg-primary-fixed/10 px-4 py-3 font-mono text-[14px] text-on-surface transition-colors hover:bg-primary-fixed/20 hover:text-primary-fixed"
                >
                  Return to root
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
    </RootDocument>
  );
}
