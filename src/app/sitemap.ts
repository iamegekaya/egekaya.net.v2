import type { MetadataRoute } from "next";

const baseUrl = (process.env.APP_URL ?? "https://egekaya.net").replace(/\/$/, "");

const routes = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.9 },
  { path: "/cyber-security", priority: 0.9 },
  { path: "/photography", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // Deliberately no lastModified. It used to be the build timestamp, which
  // marked all five pages as freshly changed on every deploy whether or not
  // they were; crawlers learn to discount a lastmod that behaves that way.
  // Omitting it is more honest than publishing a value we cannot substantiate.
  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
