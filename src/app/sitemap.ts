import type { MetadataRoute } from "next";

import { localizePath } from "@/i18n/config";
import { SITE_ROUTES, absoluteUrl, assertRoutesMatchPages, translatedPaths } from "@/lib/site-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  // Fails the build if a page was added without being declared. Cheap here,
  // and the alternative is a page that quietly never gets indexed.
  assertRoutesMatchPages();

  const translated = translatedPaths();

  return SITE_ROUTES.flatMap(({ path, priority }) => {
    const hasTurkish = translated.has(path);

    // `alternates.languages` is the sitemap half of the hreflang pair the pages
    // already declare in their <head>. Emitted only where the Turkish page
    // actually exists, so the sitemap never advertises a translation that is
    // still untranslated.
    const languages = hasTurkish
      ? { en: absoluteUrl(path), tr: absoluteUrl(localizePath(path, "tr")) }
      : undefined;

    const english = {
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority,
      ...(languages ? { alternates: { languages } } : {}),
    };

    if (!hasTurkish) return [english];

    return [
      english,
      {
        url: absoluteUrl(localizePath(path, "tr")),
        changeFrequency: "monthly" as const,
        // Slightly below the English entry: same content, but English is the
        // canonical default and carries the existing inbound links.
        priority: Math.round((priority - 0.05) * 100) / 100,
        alternates: { languages },
      },
    ];
  });

  // Deliberately no lastModified. It used to be the build timestamp, which
  // marked every page as freshly changed on every deploy whether or not it
  // was; crawlers learn to discount a lastmod that behaves that way.
}
