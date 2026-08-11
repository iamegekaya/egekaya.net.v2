"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import "./masonry.css";

/**
 * React Bits <Masonry />, ported to TypeScript.
 *
 * Kept close to the upstream source so it stays diffable, with three changes
 * that the rest of this site would otherwise be inconsistent with:
 *
 * 1. Items are real links, not divs with onClick. The upstream version calls
 *    window.open on click, which no keyboard user can reach and no crawler can
 *    follow. Here each item is an <a> and click behaviour comes for free.
 * 2. Entrance animation is skipped under prefers-reduced-motion. Items are
 *    placed at their final position instead, because GSAP owns the layout and
 *    simply disabling the tween would leave everything stacked at the origin.
 * 3. useMedia guards matchMedia so the first render is SSR-safe.
 */

type MasonryItem = {
  id: string;
  img: string;
  url: string;
  /**
   * The image's own height / width.
   *
   * Upstream takes a fixed pixel `height` instead, which means an item's box
   * only matches its image at one viewport width and `background-size: cover`
   * crops at every other one. Photographs cannot be cropped by the layout, so
   * the box is derived from this ratio and the live column width instead.
   */
  aspect: number;
  alt: string;
};

type MasonryProps = {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
};

type GridItem = MasonryItem & { x: number; y: number; w: number; h: number };

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = useCallback(() => {
    if (typeof window === "undefined") return defaultValue;
    const index = queries.findIndex((query) => window.matchMedia(query).matches);
    return values[index] ?? defaultValue;
  }, [defaultValue, queries, values]);

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get());
    const lists = queries.map((query) => window.matchMedia(query));
    lists.forEach((list) => list.addEventListener("change", handler));
    handler();
    return () => lists.forEach((list) => list.removeEventListener("change", handler));
  }, [get, queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Measure once synchronously. ResizeObserver normally delivers an initial
    // entry, but delivery is tied to the rendering lifecycle and does not
    // arrive while the page is hidden or backgrounded -- which would leave the
    // grid empty until the next resize. This makes the first paint correct
    // regardless.
    const rect = element.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        }),
    ),
  );
};

const COLUMN_QUERIES = [
  "(min-width:1500px)",
  "(min-width:1000px)",
  "(min-width:600px)",
  "(min-width:400px)",
];
const COLUMN_COUNTS = [5, 4, 3, 2];

/** Must match the .rb-masonry-item padding in masonry.css. */
const ITEM_PADDING = 6;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}: MasonryProps) {
  const columns = useMedia(COLUMN_QUERIES, COLUMN_COUNTS, 1);
  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    let cancelled = false;
    preloadImages(items.map((item) => item.img)).then(() => {
      if (!cancelled) setImagesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [items]);

  const { grid, gridHeight } = useMemo<{ grid: GridItem[]; gridHeight: number }>(() => {
    if (!width) return { grid: [], gridHeight: 0 };

    const columnHeights = new Array<number>(columns).fill(0);
    const columnWidth = width / columns;

    const packed = items.map((child) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights));
      const x = columnWidth * column;
      const y = columnHeights[column];

      // The visible image sits inside ITEM_PADDING on every side, so it is the
      // inner box that has to match the photo's ratio -- not the outer one.
      // Getting this wrong by 12px is enough to crop a frame.
      const innerWidth = Math.max(0, columnWidth - ITEM_PADDING * 2);
      const height = innerWidth * child.aspect + ITEM_PADDING * 2;

      columnHeights[column] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });

    // Every item is absolutely positioned, so the container has no intrinsic
    // height. Upstream's `height: 100%` collapses to zero and the rest of the
    // page draws over the gallery; the tallest column is the real height.
    return { grid: packed, gridHeight: Math.max(0, ...columnHeights) };
  }, [columns, items, width]);

  const getInitialPosition = useCallback(
    (item: GridItem) => {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return { x: item.x, y: item.y };

      let direction = animateFrom;
      if (animateFrom === "random") {
        const directions = ["top", "bottom", "left", "right"] as const;
        direction = directions[Math.floor(Math.random() * directions.length)];
      }

      switch (direction) {
        case "top":
          return { x: item.x, y: -200 };
        case "bottom":
          return { x: item.x, y: window.innerHeight + 200 };
        case "left":
          return { x: -200, y: item.y };
        case "right":
          return { x: window.innerWidth + 200, y: item.y };
        case "center":
          return {
            x: containerRect.width / 2 - item.w / 2,
            y: containerRect.height / 2 - item.h / 2,
          };
        default:
          return { x: item.x, y: item.y + 100 };
      }
    },
    [animateFrom, containerRef],
  );

  useLayoutEffect(() => {
    if (!imagesReady) return;
    const reduceMotion = prefersReducedMotion();

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const layout = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        if (reduceMotion) {
          // GSAP owns the layout, so items still have to be placed. They are
          // just placed directly, with no travel, blur, or fade.
          gsap.set(selector, { opacity: 1, ...layout, filter: "blur(0px)" });
          return;
        }

        const initial = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: initial.x,
            y: initial.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...layout,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          },
        );
      } else {
        gsap.to(selector, {
          ...layout,
          duration: reduceMotion ? 0 : duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
  }, [blurToFocus, duration, ease, getInitialPosition, grid, imagesReady, stagger]);

  const setHoverState = (item: GridItem, element: HTMLElement, hovered: boolean) => {
    if (prefersReducedMotion()) return;

    if (scaleOnHover) {
      gsap.to(`[data-key="${item.id}"]`, {
        scale: hovered ? hoverScale : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector(".rb-masonry-overlay");
      if (overlay) gsap.to(overlay, { opacity: hovered ? 0.3 : 0, duration: 0.3 });
    }
  };

  return (
    <div ref={containerRef} className="rb-masonry-list" style={{ height: gridHeight }}>
      {grid.map((item) => (
        <a
          key={item.id}
          data-key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.alt}
          className="rb-masonry-item"
          onMouseEnter={(event) => setHoverState(item, event.currentTarget, true)}
          onMouseLeave={(event) => setHoverState(item, event.currentTarget, false)}
          onFocus={(event) => setHoverState(item, event.currentTarget, true)}
          onBlur={(event) => setHoverState(item, event.currentTarget, false)}
        >
          <div className="rb-masonry-img" style={{ backgroundImage: `url(${item.img})` }}>
            {colorShiftOnHover ? (
              <div
                className="rb-masonry-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))",
                  opacity: 0,
                  pointerEvents: "none",
                  borderRadius: "10px",
                }}
              />
            ) : null}
          </div>
        </a>
      ))}
    </div>
  );
}
