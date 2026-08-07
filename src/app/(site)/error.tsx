"use client";

import Link from "next/link";
import { useEffect } from "react";

import GlassPanel from "@/components/ui/glass-panel";

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
      <section className="w-[min(720px,100%)]">
        <GlassPanel>
          <p className="site-page-eyebrow">Something Went Wrong</p>
          <h1 className="site-page-title max-w-none">Unexpected Error</h1>
          <p className="mt-6 text-[1rem] leading-7 text-[rgba(245,247,242,0.76)]">
            This section failed to load. Trying again usually resolves it.
          </p>

          {error.digest ? (
            <p className="mt-3 text-[0.82rem] tracking-[0.08em] text-[var(--surface-text-subtle)]">
              Reference: {error.digest}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex rounded-2xl border border-[var(--accent-border-strong)] bg-[var(--accent-bg-soft)] px-4 py-3 text-[1rem] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-bg-hover)] hover:text-[var(--accent)]"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex rounded-2xl border border-[var(--surface-border-strong)] bg-[var(--surface-input-bg)] px-4 py-3 text-[1rem] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent-border-strong)] hover:text-[var(--accent)]"
            >
              Back to home
            </Link>
          </div>
        </GlassPanel>
      </section>
    </main>
  );
}
