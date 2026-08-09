import type { Route } from "next";

import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

/**
 * The three project slots on the security page.
 *
 * Filled slots link to their own page; empty ones keep the placeholder
 * treatment. A function rather than a constant so the summaries follow the
 * locale and the hrefs point at the right language tree.
 */
export type ProjectSlot = {
  slot: string;
  title: string;
  summary: string;
  /** Present only on a published slot. Typed routes are on, so this is checked. */
  href?: Route;
  /** Terminal-style state tag shown top right. */
  state: string;
  tags: string[];
};

export function projectSlots(dict: Dictionary, locale: Locale): ProjectSlot[] {
  const s = dict.security;
  const p = dict.securityContent.projects;

  return [
    {
      slot: "SLOT_01",
      // Product name, unchanged in both locales.
      title: "OmniSight",
      summary: p.omnisightSummary,
      href: localizePath("/cyber-security/omnisight", locale),
      state: s.read,
      tags: p.omnisightTags,
    },
    {
      slot: "SLOT_02",
      title: "Silent Ingest Failure",
      summary: p.incidentSummary,
      href: localizePath("/cyber-security/silent-ingest-failure", locale),
      state: s.read,
      tags: p.incidentTags,
    },
    {
      slot: "SLOT_03",
      title: "",
      summary: s.placeholderSummary,
      state: s.comingSoon,
      tags: [],
    },
  ];
}
