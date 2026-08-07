"use client";

import Link from "next/link";
import { useEffect } from "react";

import TerminalWindow from "@/components/ui/terminal-window";
import { TEXT_DISPLAY_LG } from "@/lib/typography";

type SiteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SiteError({ error, reset }: SiteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="site-page">
      <div className="site-page-inner flex max-w-2xl flex-col">
        <TerminalWindow bodyClassName="p-6 md:p-8">
          <p className="font-mono text-[13px] tracking-[0.1em] text-primary-fixed uppercase">
            Something Went Wrong
          </p>
          <h1 className={`${TEXT_DISPLAY_LG} text-on-surface mt-2 mb-4`}>Unexpected Error</h1>
          <p className="font-sans text-[16px] leading-relaxed text-on-surface-variant">
            This section failed to load. Trying again usually resolves it.
          </p>

          {error.digest ? (
            <p className="mt-3 font-mono text-[13px] tracking-[0.08em] text-on-surface-variant/60">
              Reference: {error.digest}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-sm border border-primary-fixed bg-primary-fixed/10 px-4 py-3 font-mono text-[14px] text-on-surface transition-colors hover:bg-primary-fixed/20 hover:text-primary-fixed"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-sm border border-outline-variant px-4 py-3 font-mono text-[14px] text-on-surface transition-colors hover:border-primary-fixed hover:text-primary-fixed"
            >
              Back to home
            </Link>
          </div>
        </TerminalWindow>
      </div>
    </main>
  );
}
