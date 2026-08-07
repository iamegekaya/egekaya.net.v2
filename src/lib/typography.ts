/**
 * Text-style tokens for the "Bit & Aperture" type scale (see DESIGN.md).
 *
 * Kept as plain className strings instead of Tailwind `@theme` text tokens --
 * the project already leans on inline arbitrary values everywhere (see any
 * page component), and font-size/line-height/weight/tracking combinations are
 * simple enough as literal utility strings without adding another indirection
 * layer to globals.css.
 */
export const TEXT_DISPLAY_LG =
  "font-mono text-[32px] leading-[1.2] font-bold tracking-tight md:text-[48px] md:leading-[1.1] md:tracking-[-0.02em]";

export const TEXT_HEADLINE_MD = "font-mono text-[24px] leading-[1.4] font-medium";

export const TEXT_LABEL_CAPS = "font-mono text-[12px] leading-none font-semibold tracking-[0.1em] uppercase";
