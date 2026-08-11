import { readdirSync } from "node:fs";
import { join } from "node:path";

import { SITE_URL } from "@/lib/site-url";

/**
 * The public route list, shared by /sitemap.xml and /llms.txt.
 *
 * It lives here rather than inside sitemap.ts because two generated files now
 * need the same list, and two hand-maintained copies of one list is how the
 * second one silently falls behind.
 *
 * `assertRoutesMatchPages()` below turns "remember to add the new page" into a
 * build failure. Both new pages in this section were added by hand and only
 * happened to be remembered; a list nobody checks is a list that is already
 * wrong.
 */
type SiteRoute = {
  path: string;
  /** Sitemap priority, 0-1. */
  priority: number;
  /** Human title, used by llms.txt. */
  title: string;
  /** One factual line, used by llms.txt. */
  summary: string;
};

export const SITE_ROUTES: SiteRoute[] = [
  {
    path: "/",
    priority: 1.0,
    title: "Home",
    summary: "Landing page and short introduction.",
  },
  {
    path: "/about",
    priority: 0.9,
    title: "About",
    summary:
      "Biography, education timeline, the certification and language exams currently being studied for, and the working tech stack.",
  },
  {
    path: "/cyber-security",
    priority: 0.9,
    title: "Security profile",
    summary:
      "Security principles, actively used systems, project index, and the security internship at Aktif Yatırım Bankası.",
  },
  {
    path: "/cyber-security/omnisight",
    priority: 0.85,
    title: "OmniSight",
    summary:
      "Architecture write-up for a self-hosted network visibility and SIEM-oriented product built around a metadata-only boundary.",
  },
  {
    path: "/cyber-security/silent-ingest-failure",
    priority: 0.8,
    title: "Silent Ingest Failure",
    summary:
      "Incident analysis: 35 hours of denied agent telemetry that every health signal missed, its root cause, and the detection gap behind it.",
  },
  {
    path: "/photography",
    priority: 0.8,
    title: "Photography",
    summary: "Photography portfolio, equipment list, and how the kit changed over time.",
  },
  {
    path: "/contact",
    priority: 0.7,
    title: "Contact",
    summary: "Contact form and direct links.",
  },
];

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/**
 * Which locale-agnostic paths currently have a Turkish page on disk.
 *
 * Derived rather than declared: Turkish pages are being added one at a time,
 * and a hand-kept list would claim a translation exists before it does — which
 * would put a 404 in the sitemap and an hreflang pointing at nothing.
 */
export function translatedPaths(): Set<string> {
  try {
    return new Set(
      collectPageRoutes(join(process.cwd(), "src", "app", "(tr)", "tr"), "").map((path) => path),
    );
  } catch {
    return new Set();
  }
}

/**
 * Build-time guard: every page.tsx under src/app must appear in SITE_ROUTES.
 *
 * Skipped when the app directory is unreadable (a standalone runtime, for
 * example) so this can only ever fail during a real build, never at runtime.
 */
export function assertRoutesMatchPages() {
  const appDirectory = join(process.cwd(), "src", "app");

  let found: string[];
  try {
    found = collectPageRoutes(appDirectory, "");
  } catch {
    return;
  }

  if (!found.length) return;

  // The Turkish tree mirrors the English one, so /tr/about and /about are the
  // same entry as far as this list is concerned.
  const normalised = new Set(
    found.map((path) => (path === "/tr" ? "/" : path.startsWith("/tr/") ? path.slice(3) : path)),
  );

  const declared = new Set(SITE_ROUTES.map((route) => route.path));
  const missing = [...normalised].filter((path) => !declared.has(path));
  const stale = [...declared].filter((path) => !normalised.has(path));

  if (missing.length || stale.length) {
    const problems = [
      missing.length ? `pages missing from SITE_ROUTES: ${missing.join(", ")}` : "",
      stale.length ? `SITE_ROUTES entries with no page: ${stale.join(", ")}` : "",
    ].filter(Boolean);
    throw new Error(`src/lib/site-routes.ts is out of date — ${problems.join("; ")}`);
  }
}

function collectPageRoutes(directory: string, prefix: string): string[] {
  const routes: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === "page.tsx") {
      routes.push(prefix === "" ? "/" : prefix);
      continue;
    }

    if (!entry.isDirectory()) continue;

    // Route groups "(en)" / "(tr)" add no path segment. Private folders "_x", dynamic
    // segments "[id]", and parallel routes "@slot" are not static public pages.
    const name = entry.name;
    if (name.startsWith("_") || name.startsWith("[") || name.startsWith("@")) continue;
    if (name === "api") continue;

    const nextPrefix = name.startsWith("(") && name.endsWith(")") ? prefix : `${prefix}/${name}`;
    routes.push(...collectPageRoutes(join(directory, name), nextPrefix));
  }

  return routes;
}
