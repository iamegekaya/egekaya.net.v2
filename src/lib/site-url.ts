const DEFAULT_SITE_URL = "https://egekaya.net";

function resolveSiteUrl() {
  const configuredUrl = process.env.APP_URL?.trim() || DEFAULT_SITE_URL;
  let url: URL;

  try {
    url = new URL(configuredUrl);
  } catch {
    throw new Error("APP_URL must be an absolute http(s) URL.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("APP_URL must use the http or https protocol.");
  }

  if (url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("APP_URL must be an origin without credentials, a path, a query, or a fragment.");
  }

  return url.origin;
}

/** Canonical public origin used by metadata, generated routes, and form checks. */
export const SITE_URL = resolveSiteUrl();
