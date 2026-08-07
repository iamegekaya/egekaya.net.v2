import type { ReactNode } from "react";

/**
 * The red/yellow/green-dot terminal chrome repeated across the home hero,
 * the security page, and the contact form in the Stitch mockups. One shared
 * component instead of copy-pasting the dot markup three times per the
 * earlier audit's "repeated logic" findings on the previous design.
 */
type TerminalWindowProps = {
  title?: string;
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
