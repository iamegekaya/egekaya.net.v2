"use client";

import { useEffect, useRef, useState } from "react";

// House-written, not a React Bits port. A vertical accent line pinned to one
// edge of the viewport with a fill that tracks scroll position -- reads as a
// wayfinding spine on a single long scrolling page, not a decorative gimmick.
// Hidden below md: a page this narrow has no room for a rail beside the
// content, and StaggeredMenu already owns that edge on small screens.
type LineSidebarProps = {
  side?: "left" | "right";
};

export default function LineSidebar({ side = "left" }: LineSidebarProps) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      rafRef.current = null;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    // Starts below the fixed header instead of at the viewport top -- the
    // logo bubble sits in that top-left corner (see .bubble-menu in
    // globals.css) and a full-height line would run right past it.
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-32 bottom-0 z-30 hidden w-px md:block ${side === "left" ? "left-6" : "right-6"}`}
    >
      <div className="h-full w-full bg-[var(--surface-border-subtle)]" />
      <div
        className="absolute top-0 w-full bg-[var(--accent)] transition-[height] duration-150 ease-out"
        style={{ height: `${progress * 100}%`, boxShadow: "0 0 12px var(--accent-bg-hover)" }}
      />
    </div>
  );
}
