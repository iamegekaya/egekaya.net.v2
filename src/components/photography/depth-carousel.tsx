"use client";

/**
 * Ported from React Bits' DepthCarousel (JavaScript + CSS variant).
 *
 * Deliberate divergences from upstream, all marked inline below:
 *  - TypeScript, and ref callbacks written as blocks. Upstream's
 *    `ref={el => (refs.current[i] = el)}` returns the element, which React 19
 *    treats as a ref cleanup function.
 *  - Images go through next/image rather than a raw <img>, so the gallery keeps
 *    the optimisation this project added for it.
 *  - Items may carry an `href`; clicking the already-focused card opens it.
 *    This preserves the "open the original file" behaviour the masonry grid had.
 *
 * The upstream prop surface is kept intact even where this site passes nothing,
 * because pruning a vendored component's API is a fork, not a cleanup.
 */

import Image from "next/image";
import { gsap } from "gsap";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

export type DepthCarouselItem = {
  image: string;
  alt?: string;
  /** Port addition: opened when the focused card is activated. */
  href?: string;
};

type DepthCarouselProps = {
  items?: (DepthCarouselItem | string)[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: "left" | "right";
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  onChange?: (index: number, item: DepthCarouselItem | undefined) => void;
  className?: string;
  sizes?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const normalizeItem = (item: DepthCarouselItem | string): DepthCarouselItem =>
  typeof item === "string" ? { image: item, alt: "" } : item;

export default function DepthCarousel({
  items = [],
  cardWidth = 300,
  cardHeight = 380,
  radius = 18,
  tint = "#05060a",
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = "right",
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  duration = 700,
  ease = "power3.out",
  autoplay = false,
  autoplayDelay = 3200,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = "",
  sizes,
}: DepthCarouselProps) {
  const data = useMemo(
    () => (Array.isArray(items) ? items : []).map(normalizeItem),
    [items],
  );
  const count = data.length;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const posRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleRef = useRef(1);
  const onChangeRef = useRef(onChange);

  const dragRef = useRef<{
    x: number;
    startPos: number;
    lastX: number;
    lastT: number;
    v: number;
    moved: boolean;
    id: number;
  } | null>(null);
  const wheelTimerRef = useRef<number | null>(null);
  const autoTimerRef = useRef<number | null>(null);
  const reducedRef = useRef(false);

  const [active, setActive] = useState(0);

  const cfgRef = useRef({
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    loop,
    cardWidth,
    autoplayDelay,
  });

  // Upstream assigns both of these straight into the render body. React 19
  // rejects that (react-hooks/refs), so the sync moves into an effect with no
  // dependency array, which runs after every render and keeps the same
  // semantics. Declared before the other effects so they read fresh config; the
  // useRef initialiser above already seeds the first render.
  useEffect(() => {
    onChangeRef.current = onChange;
    cfgRef.current = {
      count,
      depth,
      spread,
      tilt,
      tiltDirection,
      visibleCards,
      falloff,
      blur,
      duration,
      ease,
      loop,
      cardWidth,
      autoplayDelay,
    };
  });

  const layout = useCallback((pos: number) => {
    const cfg = cfgRef.current;
    const total = cfg.count;

    if (!total) {
      return;
    }

    const direction = cfg.tiltDirection === "left" ? -1 : 1;
    const scale = scaleRef.current;

    for (let index = 0; index < total; index += 1) {
      const element = cardRefs.current[index];

      if (!element) {
        continue;
      }

      let distance = index - pos;

      if (cfg.loop && total > 1) {
        distance = ((distance % total) + total) % total;
        if (distance > total / 2) {
          distance -= total;
        }
      }

      const back = Math.max(0, distance);
      const shown = Math.abs(distance) <= cfg.visibleCards + 0.5;

      const translateZ = -cfg.depth * distance;
      const translateX = direction * cfg.spread * distance;
      const rotateY = direction * cfg.tilt * clamp(distance, 0, 1);

      let opacity = distance < 0 ? Math.max(0, 1 + distance) : 1;
      if (!shown) {
        opacity = 0;
      }

      const brightness = Math.max(0.15, 1 - back * cfg.falloff);
      const blurPx =
        cfg.blur > 0 ? Math.min(cfg.blur, (back / Math.max(1, cfg.visibleCards)) * cfg.blur) : 0;

      element.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${translateX.toFixed(2)}px) translateZ(${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(3)}deg)`;
      element.style.opacity = opacity.toFixed(3);
      element.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
      element.style.zIndex = String(Math.round(2000 - distance * 20));
      element.style.pointerEvents = shown && opacity > 0.05 ? "auto" : "none";

      const overlay = overlayRefs.current[index];

      if (overlay) {
        overlay.style.opacity = clamp(back * cfg.falloff * 1.25, 0, 0.86).toFixed(3);
      }
    }
  }, []);

  const notify = useCallback(
    (index: number) => {
      setActive(index);
      onChangeRef.current?.(index, data[index]);
    },
    [data],
  );

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill();

      const cfg = cfgRef.current;
      const proxy = { p: posRef.current };

      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: animate && !reducedRef.current ? cfg.duration / 1000 : 0,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          if (cfg.count > 0) {
            posRef.current = ((posRef.current % cfg.count) + cfg.count) % cfg.count;
          }
          layout(posRef.current);
        },
      });
    },
    [layout],
  );

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const cfg = cfgRef.current;
      const total = cfg.count;

      if (!total) {
        return;
      }

      const index = cfg.loop
        ? ((rawIndex % total) + total) % total
        : clamp(rawIndex, 0, total - 1);

      let delta = index - posRef.current;

      if (cfg.loop && total > 1) {
        delta = ((delta % total) + total) % total;
        if (delta > total / 2) {
          delta -= total;
        }
      }

      tweenTo(posRef.current + delta, animate);

      if (index !== focusRef.current) {
        focusRef.current = index;
        notify(index);
      }
    },
    [tweenTo, notify],
  );

  const navigateBy = useCallback(
    (step: number) => setFocus(focusRef.current + step, true),
    [setFocus],
  );

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      const cfg = cfgRef.current;
      const needed = cfg.cardWidth + Math.abs(cfg.spread) * 2 + 120;
      scaleRef.current = clamp(width / needed, 0.4, 1);
      layout(posRef.current);
    });

    observer.observe(root);

    return () => observer.disconnect();
  }, [layout]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      const cfg = cfgRef.current;

      if (cfg.count < 2) {
        return;
      }

      event.preventDefault();
      tweenRef.current?.kill();

      const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const delta = event.deltaMode === 1 ? raw * 24 : raw;

      posRef.current += clamp(delta / (cfg.cardWidth * 0.9), -0.6, 0.6);
      layout(posRef.current);

      if (wheelTimerRef.current) {
        window.clearTimeout(wheelTimerRef.current);
      }

      wheelTimerRef.current = window.setTimeout(() => {
        setFocus(Math.round(posRef.current), true);
      }, 130);
    };

    root.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      root.removeEventListener("wheel", handleWheel);
      if (wheelTimerRef.current) {
        window.clearTimeout(wheelTimerRef.current);
      }
    };
  }, [layout, setFocus]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (cfgRef.current.count < 2) {
      return;
    }

    tweenRef.current?.kill();
    dragRef.current = {
      x: event.clientX,
      startPos: posRef.current,
      lastX: event.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: event.pointerId,
    };
  }, []);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;

      if (!drag) {
        return;
      }

      const cfg = cfgRef.current;
      const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40);
      const dx = event.clientX - drag.x;

      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true;
        rootRef.current?.setPointerCapture(drag.id);
      }

      if (!drag.moved) {
        return;
      }

      const now = performance.now();
      drag.v = (event.clientX - drag.lastX) / Math.max(now - drag.lastT, 1);
      drag.lastX = event.clientX;
      drag.lastT = now;

      posRef.current = drag.startPos - dx / stepPx;
      layout(posRef.current);
    },
    [layout],
  );

  const handlePointerEnd = useCallback(() => {
    const drag = dragRef.current;

    if (!drag) {
      return;
    }

    dragRef.current = null;

    if (!drag.moved) {
      return;
    }

    const cfg = cfgRef.current;
    const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40);
    setFocus(Math.round(posRef.current - (drag.v * 180) / stepPx), true);
  }, [setFocus]);

  // Port addition: the masonry grid let you open the full-resolution file, so
  // activating the focused card keeps that route open — by pointer via a second
  // click, and by keyboard via Enter/Space on the carousel itself.
  const openFocused = useCallback(() => {
    const href = data[focusRef.current]?.href;

    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }, [data]);

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateBy(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateBy(1);
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openFocused();
      }
    },
    [navigateBy, openFocused],
  );

  const handleCardClick = useCallback(
    (index: number) => {
      if (dragRef.current?.moved) {
        return;
      }

      if (index === focusRef.current) {
        openFocused();
        return;
      }

      setFocus(index, true);
    },
    [openFocused, setFocus],
  );

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!autoplay || reducedRef.current || count < 2) {
      return;
    }

    const root = rootRef.current;
    let hovered = false;
    let focused = false;

    const stop = () => {
      if (autoTimerRef.current) {
        window.clearInterval(autoTimerRef.current);
      }
      autoTimerRef.current = null;
    };

    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };

    root?.addEventListener("mouseenter", onEnter);
    root?.addEventListener("mouseleave", onLeave);
    root?.addEventListener("focusin", onFocusIn);
    root?.addEventListener("focusout", onFocusOut);

    stop();
    autoTimerRef.current = window.setInterval(
      () => {
        if (!hovered && !focused) {
          navigateBy(1);
        }
      },
      Math.max(cfgRef.current.autoplayDelay, 600),
    );

    return () => {
      stop();
      root?.removeEventListener("mouseenter", onEnter);
      root?.removeEventListener("mouseleave", onLeave);
      root?.removeEventListener("focusin", onFocusIn);
      root?.removeEventListener("focusout", onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  useEffect(() => {
    layout(posRef.current);
  }, [
    layout,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
    falloff,
    blur,
    cardWidth,
    cardHeight,
    radius,
    count,
  ]);

  useEffect(
    () => () => {
      tweenRef.current?.kill();
      if (wheelTimerRef.current) {
        window.clearTimeout(wheelTimerRef.current);
      }
      if (autoTimerRef.current) {
        window.clearInterval(autoTimerRef.current);
      }
    },
    [],
  );

  return (
    <div
      ref={rootRef}
      className={`depth-carousel ${className}`.trim()}
      style={{ "--dc-perspective": `${perspective}px` } as CSSProperties}
      role="group"
      aria-roledescription="carousel"
      aria-label="Photo carousel"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      <div className="depth-carousel__stage">
        {data.map((item, index) => (
          <div
            key={item.image}
            className="depth-carousel__card"
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={active !== index}
            onClick={() => handleCardClick(index)}
          >
            {/* Explicit dimensions rather than `fill`: with `fill` next/image
                builds its srcset from deviceSizes alone, whose smallest entry
                is 640px, so a 340px card still downloaded a 640px file. Sized
                images also draw on imageSizes, which lets the optimizer serve
                384px here. `sizes` stays available for callers who need it. */}
            <Image
              className="depth-carousel__img"
              src={item.image}
              alt={item.alt ?? ""}
              width={cardWidth}
              height={cardHeight}
              sizes={sizes}
              draggable={false}
              priority={index === 0}
            />
            <span
              className="depth-carousel__tint"
              ref={(element) => {
                overlayRefs.current[index] = element;
              }}
              style={{ background: tint }}
            />
          </div>
        ))}
      </div>

      {showControls && count > 1 ? (
        <>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--prev"
            aria-label="Previous photo"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--next"
            aria-label="Next photo"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      ) : null}

      {showIndicators && count > 1 ? (
        <div className="depth-carousel__dots" role="tablist" aria-label="Photos">
          {data.map((item, index) => (
            <button
              key={item.image}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`Go to photo ${index + 1}`}
              className={`depth-carousel__dot${active === index ? " is-active" : ""}`}
              onClick={() => setFocus(index, true)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
