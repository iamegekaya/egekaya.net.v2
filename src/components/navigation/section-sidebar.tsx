"use client";

import { useCallback, useEffect, useState } from "react";

import LineSidebar from "./line-sidebar";

/**
 * Page-section navigation built on <LineSidebar />.
 *
 * Fixed to the left margin rather than placed in the page flow: the three
 * pages that use it keep their existing single-column layout untouched, and
 * the component's labels slide right on hover, which only reads correctly with
 * empty space to their left.
 *
 * Hidden below xl. Under 1280px there is no margin to sit in without
 * overlapping the 1200px content column.
 */
type SidebarSection = {
  id: string;
  label: string;
};

/** Matches the fixed header height so a scrolled-to heading is not hidden by it. */
const HEADER_OFFSET = 96;

export default function SectionSidebar({
  sections,
  ariaLabel,
}: {
  sections: SidebarSection[];
  ariaLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSection = useCallback(
    (index: number) => {
      const target = document.getElementById(sections[index].id);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [sections],
  );

  // Scroll spy. Uses scroll position rather than IntersectionObserver ratios
  // because sections here differ wildly in height -- a 200px card and a 1200px
  // gallery -- and ratio-based observers pick the short one far too eagerly.
  useEffect(() => {
    const onScroll = () => {
      // A section closer to the page bottom than one viewport can never reach
      // the marker: the page runs out of scroll first, so the last entry would
      // never light up however far you scrolled. Measured on /about, where the
      // final section needed 1337px of scroll against a 1143px maximum.
      // Hitting the bottom therefore selects the last section outright.
      const scrollBottom = window.scrollY + window.innerHeight;
      if (scrollBottom >= document.documentElement.scrollHeight - 2) {
        setActiveIndex(sections.length - 1);
        return;
      }

      const marker = window.scrollY + HEADER_OFFSET + 1;
      let current = 0;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (!element) return;
        if (element.getBoundingClientRect().top + window.scrollY <= marker) current = index;
      });

      setActiveIndex(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    // Positioned against the centred 1200px content column, not the viewport
    // edge. At 1280px the column already spans 40px..1240px, so an xl-gated
    // sidebar at left-6 painted straight over the cards. 780px = half the
    // column (600) plus the sidebar's own width and gutter, and 1600px is the
    // first width where that margin actually exists.
    <div className="pointer-events-none fixed top-1/2 left-[calc(50%-780px)] z-30 hidden -translate-y-1/2 min-[1600px]:block">
      <div className="pointer-events-auto">
        <LineSidebar
          aria-label={ariaLabel}
          items={sections.map((section) => section.label)}
          activeIndex={activeIndex}
          onItemClick={scrollToSection}
          markerLength={40}
          maxShift={12}
          itemGap={18}
          fontSize={0.8}
          proximityRadius={90}
        />
      </div>
    </div>
  );
}
