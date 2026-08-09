"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import "./line-sidebar.css";

/**
 * React Bits <LineSidebar />, ported to TypeScript.
 *
 * Four changes from upstream, each because the rest of this site would
 * otherwise be inconsistent:
 *
 * 1. Items are real <button>s. Upstream puts onClick on a bare <li>, which no
 *    keyboard user can reach and no screen reader announces as actionable.
 * 2. Colours default to the site's theme tokens instead of hardcoded hex, so
 *    the sidebar follows light and dark mode.
 * 3. `activeIndex` may be controlled, so a scroll-spy can drive it. Upstream
 *    only exposes `defaultActive` and keeps the state to itself.
 * 4. The proximity loop is skipped under prefers-reduced-motion; the active
 *    item is still highlighted, it just does not slide or ease.
 */

const FALLOFF_CURVES = {
  linear: (p: number) => p,
  smooth: (p: number) => p * p * (3 - 2 * p),
  sharp: (p: number) => p * p * p,
} as const;

export type LineSidebarProps = {
  items: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: keyof typeof FALLOFF_CURVES;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  /** When provided the component is controlled and ignores its own state. */
  activeIndex?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
  "aria-label"?: string;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function LineSidebar({
  items,
  accentColor = "var(--primary-fixed)",
  textColor = "var(--on-surface-variant)",
  markerColor = "var(--outline-variant)",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = "smooth",
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  activeIndex: controlledActive,
  onItemClick,
  className = "",
  "aria-label": ariaLabel,
}: LineSidebarProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const smoothingRef = useRef(smoothing);

  const [uncontrolledActive, setUncontrolledActive] = useState<number | null>(defaultActive);
  const active = controlledActive !== undefined ? controlledActive : uncontrolledActive;
  const activeRef = useRef<number | null>(active);

  // Mirrored into refs so the rAF loop can read the latest values without being
  // rebuilt every render. Declared before the effect that starts the loop, so
  // the refs are already current when it runs -- effects fire in source order,
  // and reversing these two would let the loop open on a stale active index.
  useEffect(() => {
    activeRef.current = active;
    smoothingRef.current = smoothing;
  }, [active, smoothing]);

  // The loop reschedules itself through this ref rather than by naming
  // runFrame inside its own body: a self-referencing useCallback captures the
  // first closure forever, which is exactly what the lint rule is warning
  // about, and would pin stale state if this callback ever gained a dependency.
  const frameRef = useRef<(now: number) => void>(null);

  // Single rAF loop easing every item's --effect toward its target with
  // frame-rate independent exponential smoothing, so colour, shift and scale
  // move together instead of staggering separate CSS transitions.
  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const elements = itemRefs.current;

    for (let i = 0; i < elements.length; i += 1) {
      const element = elements[i];
      if (!element) continue;

      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;

      currentRef.current[i] = value;
      element.style.setProperty("--effect", value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving
      ? requestAnimationFrame((next) => frameRef.current?.(next))
      : null;
  }, []);

  useEffect(() => {
    frameRef.current = runFrame;
  }, [runFrame]);

  const startLoop = useCallback(() => {
    if (prefersReducedMotion()) {
      // Apply the resting state directly: active item lit, everything else off.
      itemRefs.current.forEach((element, index) => {
        element?.style.setProperty("--effect", activeRef.current === index ? "1" : "0");
      });
      return;
    }

    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list || prefersReducedMotion()) return;

      const rect = list.getBoundingClientRect();
      const pointerY = event.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;

      itemRefs.current.forEach((element, index) => {
        if (!element) return;
        const center = element.offsetTop + element.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[index] = ease(Math.max(0, 1 - distance / proximityRadius));
      });

      startLoop();
    },
    [falloff, proximityRadius, startLoop],
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index: number, label: string) => {
      if (controlledActive === undefined) setUncontrolledActive(index);
      onItemClick?.(index, label);
    },
    [controlledActive, onItemClick],
  );

  useEffect(() => {
    startLoop();
  }, [active, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    },
    [],
  );

  return (
    <nav
      aria-label={ariaLabel}
      className={`line-sidebar${showMarker ? " line-sidebar--markers" : ""}${
        scaleTick ? " line-sidebar--scale-tick" : ""
      }${className ? ` ${className}` : ""}`}
      style={
        {
          "--accent-color": accentColor,
          "--text-color": textColor,
          "--marker-color": markerColor,
          "--marker-length": `${markerLength}px`,
          "--marker-gap": `${markerGap}px`,
          "--tick-scale": tickScale,
          "--max-shift": `${maxShift}px`,
          "--item-gap": `${itemGap}px`,
          "--font-size": `${fontSize}rem`,
          "--smoothing": `${smoothing}ms`,
        } as React.CSSProperties
      }
    >
      <ul
        ref={listRef}
        className="line-sidebar__list"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className="line-sidebar__item"
          >
            {showMarker ? <span className="line-sidebar__marker" aria-hidden="true" /> : null}
            <button
              type="button"
              className="line-sidebar__button"
              aria-current={active === index ? "true" : undefined}
              onClick={() => handleClick(index, label)}
            >
              <span className="line-sidebar__label">
                {showIndex ? (
                  <span className="line-sidebar__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <span className="line-sidebar__text">{label}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
