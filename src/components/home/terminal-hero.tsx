"use client";

import { useEffect, useState } from "react";

import TerminalWindow from "@/components/ui/terminal-window";

const ROLES = [
  "SOC Analyst (Tier 1)",
  "Security Analyst",
  "SIEM Engineer",
  "Blue Team Engineer",
  "Security Engineer",
  "Application Security (AppSec) Engineer",
  "Product Security Engineer",
  "Security Automation Engineer",
  "SecOps Engineer",
  "Infrastructure Security Engineer",
];

const TYPED_LINES = [
  "ROOT_USER@EGEKAYA:~$ whoami",
  "",
  "> Loading profile...",
  "> Identity confirmed: Ege Kaya.",
  `> Role: ${ROLES.join(", ")}.`,
  "> Secondary process: Photography.",
  "> Access granted.",
];

const FULL_TEXT = TYPED_LINES.join("\n");

// The role list roughly tripled the typed text, so the per-character delay is
// derived from a target duration rather than fixed -- otherwise the wait grows
// with every role added to ROLES. The floor matters: below roughly 15ms the
// timer granularity dominates and the text arrives in bursts instead of
// typing, so a long enough ROLES list overruns the target rather than
// degrading into an instant paste.
const TYPING_DURATION_MS = 6000;
const MIN_MS_PER_CHARACTER = 18;
const MS_PER_CHARACTER = Math.max(
  MIN_MS_PER_CHARACTER,
  TYPING_DURATION_MS / FULL_TEXT.length,
);

export default function TerminalHero() {
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stepTimer: number | undefined;

    const runTypingLoop = () => {
      let index = 0;

      const step = () => {
        index += 1;
        setTypedLength(index);

        if (index >= FULL_TEXT.length) {
          return;
        }

        stepTimer = window.setTimeout(step, Math.random() * MS_PER_CHARACTER + MS_PER_CHARACTER * 0.5);
      };

      stepTimer = window.setTimeout(step, 600);
    };

    // Subscribed (not just called once) so flipping the OS-level reduced
    // motion preference mid-animation jumps straight to the full text
    // instead of leaving a half-typed line on screen.
    const syncFromPreference = () => {
      window.clearTimeout(stepTimer);

      if (reducedMotionQuery.matches) {
        setTypedLength(FULL_TEXT.length);
      } else {
        setTypedLength(0);
        runTypingLoop();
      }
    };

    syncFromPreference();
    reducedMotionQuery.addEventListener("change", syncFromPreference);

    return () => {
      reducedMotionQuery.removeEventListener("change", syncFromPreference);
      window.clearTimeout(stepTimer);
    };
  }, []);

  const typed = FULL_TEXT.slice(0, typedLength);
  const isTyping = typedLength < FULL_TEXT.length;

  return (
    <TerminalWindow className="max-w-3xl" bodyClassName="p-6">
      <p className="font-mono text-[14px] leading-relaxed text-on-surface-variant">Login: root</p>
      <p className="font-mono text-[14px] leading-relaxed text-on-surface-variant mb-4">Password: *********</p>
      {/*
        The role list wraps to a different number of lines per breakpoint, so
        the finished height is reserved up front rather than letting the box
        grow as it types and push the cards below it down. Measured against the
        rendered text: 341px at 375px wide, 228px at 640px, 205px from 768px up
        (the terminal stops widening at max-w-3xl).
      */}
      <pre className="min-h-[350px] whitespace-pre-wrap font-mono text-[14px] leading-relaxed text-primary-fixed sm:min-h-[235px] md:min-h-[210px]">
        {typed}
        {isTyping ? <span className="terminal-cursor" /> : null}
      </pre>
    </TerminalWindow>
  );
}
