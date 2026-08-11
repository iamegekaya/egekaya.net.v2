"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * React Bits <DecryptedText />, ported to TypeScript.
 *
 * Three changes from upstream:
 *
 * 1. A plain <span> instead of motion.span. Upstream imports `motion/react`
 *    but passes the element no animation props at all -- it is a span with a
 *    ref. Pulling in a second animation library (gsap is already here for the
 *    gallery) to render a static span is not a trade worth making. Reinstate
 *    motion only if a caller actually needs to pass motion props through.
 * 2. The screen-reader copy renders `text`, not `displayText`. Upstream puts
 *    the scrambled string in the sr-only node, so assistive tech reads the
 *    ciphertext -- and these are page headings.
 * 3. Reduced motion skips the effect and shows the text outright.
 */

const WRAPPER_STYLE: React.CSSProperties = {
  display: "inline-block",
  whiteSpace: "pre-wrap",
};

const SR_ONLY_STYLE: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  border: 0,
};

const DEFAULT_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";

type DecryptedTextProps = {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover" | "inViewHover" | "click";
  clickMode?: "once" | "toggle";
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARACTERS,
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  clickMode = "once",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== "click");

  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars = useMemo(
    () =>
      useOriginalCharsOnly
        ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
        : characters.split(""),
    [useOriginalCharsOnly, text, characters],
  );

  const shuffleText = useCallback(
    (original: string, revealed: Set<number>) =>
      original
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (revealed.has(index)) return original[index];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join(""),
    [availableChars],
  );

  const triggerDecrypt = useCallback(() => {
    if (prefersReducedMotion()) {
      setDisplayText(text);
      setIsDecrypted(true);
      return;
    }
    setRevealedIndices(new Set());
    setIsAnimating(true);
  }, [text]);

  useEffect(() => {
    if (!isAnimating) return;

    let iteration = 0;

    const nextIndex = (revealed: Set<number>) => {
      const length = text.length;
      if (revealDirection === "end") return length - 1 - revealed.size;
      if (revealDirection === "center") {
        const middle = Math.floor(length / 2);
        const offset = Math.floor(revealed.size / 2);
        const candidate = revealed.size % 2 === 0 ? middle + offset : middle - offset - 1;
        if (candidate >= 0 && candidate < length && !revealed.has(candidate)) return candidate;
        for (let i = 0; i < length; i += 1) if (!revealed.has(i)) return i;
        return 0;
      }
      return revealed.size;
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices((previous) => {
        const stop = () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(true);
        };

        if (sequential) {
          if (previous.size < text.length) {
            const revealed = new Set(previous);
            revealed.add(nextIndex(previous));
            setDisplayText(shuffleText(text, revealed));
            return revealed;
          }
          stop();
          return previous;
        }

        setDisplayText(shuffleText(text, previous));
        iteration += 1;
        if (iteration >= maxIterations) {
          stop();
          setDisplayText(text);
        }
        return previous;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText]);

  // View observer
  useEffect(() => {
    if (animateOn !== "view" && animateOn !== "inViewHover") return;

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerDecrypt();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [animateOn, hasAnimated, triggerDecrypt]);

  const handleHoverStart = useCallback(() => {
    if (isAnimating) return;
    setIsDecrypted(false);
    triggerDecrypt();
  }, [isAnimating, triggerDecrypt]);

  const handleHoverEnd = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
  }, [text]);

  const handleClick = useCallback(() => {
    if (animateOn !== "click") return;
    if (clickMode === "once" && isDecrypted) return;
    setIsDecrypted(false);
    triggerDecrypt();
  }, [animateOn, clickMode, isDecrypted, triggerDecrypt]);

  const interaction =
    animateOn === "hover" || animateOn === "inViewHover"
      ? { onMouseEnter: handleHoverStart, onMouseLeave: handleHoverEnd }
      : animateOn === "click"
        ? { onClick: handleClick }
        : {};

  const settled = !isAnimating && isDecrypted;

  return (
    <span ref={containerRef} className={parentClassName} style={WRAPPER_STYLE} {...interaction}>
      {settled ? (
        // At rest there is nothing to hide, so render one plain copy. Upstream
        // always renders both an sr-only node and an aria-hidden one, which
        // leaves the heading's text duplicated in the DOM -- including in the
        // server-rendered HTML, where nothing is animating at all.
        <span className={className}>{text}</span>
      ) : (
        <>
          {/* The real text, always. Never the scrambled copy: this is what
              assistive tech reads while the characters are still shuffling. */}
          <span style={SR_ONLY_STYLE}>{text}</span>

          <span aria-hidden="true">
            {displayText.split("").map((char, index) => (
              <span
                key={index}
                className={revealedIndices.has(index) ? className : encryptedClassName}
              >
                {char}
              </span>
            ))}
          </span>
        </>
      )}
    </span>
  );
}
