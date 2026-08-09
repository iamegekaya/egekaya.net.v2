import type { ReactNode } from "react";

/**
 * The red/yellow/green-dot terminal chrome, shared by seven callers: the home
 * hero, the about/security/photography pages, the contact form, and both error
 * screens. One component rather than copy-pasted dot markup in each.
 */
type TerminalWindowProps = {
  /** ReactNode rather than string so a caller can pass an animated title. */
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export default function TerminalWindow({ title, children, className = "", bodyClassName = "" }: TerminalWindowProps) {
  return (
    <div
      className={`glow-border overflow-hidden rounded-lg border border-outline-variant bg-surface-container transition-colors ${className}`.trim()}
    >
      <div className="flex items-center gap-2 border-b border-outline-variant bg-surface-container-high px-4 py-2.5">
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--terminal-dot-red)" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "var(--terminal-dot-yellow)" }} />
        <span className="h-3 w-3 rounded-full bg-primary-fixed" />
        {title ? <span className="font-mono text-[13px] text-on-surface-variant ml-2">{title}</span> : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
