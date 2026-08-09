import { SITE_ROUTES, absoluteUrl, assertRoutesMatchPages, translatedPaths } from "@/lib/site-routes";

/**
 * /llms.txt — the llmstxt.org convention: a short, link-first Markdown summary
 * an AI agent can read instead of crawling and guessing at the site.
 *
 * Generated from the same SITE_ROUTES list as the sitemap so the two cannot
 * disagree about what this site contains.
 *
 * Deliberately factual and free of marketing language. An agent quoting this
 * file is quoting it to someone, so anything here has to be true on its own.
 */
export const dynamic = "force-static";

function buildLlmsTxt() {
  assertRoutesMatchPages();

  const projects = SITE_ROUTES.filter((route) => route.path.startsWith("/cyber-security/"));
  const pages = SITE_ROUTES.filter((route) => !route.path.startsWith("/cyber-security/"));

  const lines = [
    "# Ege Kaya",
    "",
    "> Personal site of Ege Kaya: information security work and photography.",
    "",
    "Ege Kaya is an information security student at Yeditepe University in Turkey, working on",
    "self-hosted security tooling and defensive engineering. The security section carries",
    "project and incident write-ups; the photography section is a separate portfolio.",
    "",
    "The write-ups are the substantive part of this site. They describe real systems and real",
    "failures, including what was not resolved.",
    "",
    "## Pages",
    "",
    ...pages.map((route) => `- [${route.title}](${absoluteUrl(route.path)}): ${route.summary}`),
    "",
    "## Write-ups",
    "",
    ...projects.map((route) => `- [${route.title}](${absoluteUrl(route.path)}): ${route.summary}`),
    "",
    "## Languages",
    "",
    "- English is the default and lives at the unprefixed paths above.",
    "- Turkish translations live under /tr, for the pages listed as translated:",
    ...[...translatedPaths()].sort().map((path) => `  - ${absoluteUrl(path === "/" ? "/tr" : "/tr" + path)}`),
    "- Pages not listed there exist in English only.",
    "",
    "## Notes for agents",
    "",
    "- Contact goes through the form at " + absoluteUrl("/contact") + ".",
    "- `/api/` is not part of the public content and is disallowed in robots.txt.",
    "- Certifications listed under 'Preparing_For' on the About page are being studied for, not held.",
    "- OmniSight is in development. It is not a released or purchasable product.",
    "",
  ];

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
