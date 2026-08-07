"use client";

import { useEffect, useState } from "react";

import TerminalWindow from "@/components/ui/terminal-window";

const TYPED_LINES = [
  "ROOT_USER@EGEKAYA:~$ whoami",
  "",
  "> Loading profile...",
  "> Identity confirmed: Ege Kaya.",
  "> Role: Cybersecurity enthusiast, Yeditepe University.",
  "> Secondary process: Photography & visual arts.",
  "> Access granted.",
];

const FULL_TEXT = TYPED_LINES.join("\n");

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

        stepTimer = window.setTimeout(step, Math.random() * 35 + 12);
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
      <pre className="min-h-[130px] whitespace-pre-wrap font-mono text-[14px] leading-relaxed text-primary-fixed">
        {typed}
        {isTyping ? <span className="terminal-cursor" /> : null}
      </pre>
    </TerminalWindow>
  );
}
