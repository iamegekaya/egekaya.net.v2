"use client";

import { useEffect, useMemo, useState } from "react";

import TerminalWindow from "@/components/ui/terminal-window";
import type { Dictionary } from "@/i18n";

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

// Role titles stay in English in both locales: these are the job titles Ege is
// actually applying for, and a Turkish reader searching for "SOC Analyst" will
// search for exactly that. Translating them would help nobody.
function buildScript(dict: Dictionary) {
  const t = dict.home;
  return [
    t.prompt,
    "",
    t.loadingProfile,
    t.identityConfirmed,
    `${t.roleLabel} ${ROLES.join(", ")}.`,
    t.secondaryProcess,
    t.accessGranted,
  ].join("\n");
}

// The role list roughly tripled the typed text, so the per-character delay is
// derived from a target duration rather than fixed -- otherwise the wait grows
// with every role added to ROLES. The floor matters: below roughly 15ms the
// timer granularity dominates and the text arrives in bursts instead of
// typing, so a long enough ROLES list overruns the target rather than
// degrading into an instant paste.
const TYPING_DURATION_MS = 6000;
const MIN_MS_PER_CHARACTER = 18;

export default function TerminalHero({ dict }: { dict: Dictionary }) {
  const [typedLength, setTypedLength] = useState(0);

  // Both derive from the dictionary now, so they moved inside the component.
  // The pace is still computed from the finished length rather than fixed:
  // the Turkish script is a different length and would otherwise type at a
  // noticeably different speed.
  const fullText = useMemo(() => buildScript(dict), [dict]);
  const msPerCharacter = useMemo(
    () => Math.max(MIN_MS_PER_CHARACTER, TYPING_DURATION_MS / fullText.length),
    [fullText],
  );

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stepTimer: number | undefined;

    const runTypingLoop = () => {
      let index = 0;

      const step = () => {
        index += 1;
        setTypedLength(index);

        if (index >= fullText.length) {
          return;
        }

        stepTimer = window.setTimeout(step, Math.random() * msPerCharacter + msPerCharacter * 0.5);
      };

      stepTimer = window.setTimeout(step, 600);
    };

    // Subscribed (not just called once) so flipping the OS-level reduced
    // motion preference mid-animation jumps straight to the full text
    // instead of leaving a half-typed line on screen.
    const syncFromPreference = () => {
      window.clearTimeout(stepTimer);

      if (reducedMotionQuery.matches) {
        setTypedLength(fullText.length);
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
  }, [fullText, msPerCharacter]);

  const typed = fullText.slice(0, typedLength);
  const isTyping = typedLength < fullText.length;

  return (
    <TerminalWindow className="max-w-3xl" bodyClassName="p-6">
      <p className="font-mono text-[14px] leading-relaxed text-on-surface-variant">{dict.home.login}</p>
      <p className="font-mono text-[14px] leading-relaxed text-on-surface-variant mb-4">{dict.home.password}</p>
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
