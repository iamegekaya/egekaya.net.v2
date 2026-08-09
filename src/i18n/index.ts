import { DEFAULT_LOCALE, type Locale } from "./config";
import { en, type Dictionary } from "./en";
import { tr } from "./tr";

const DICTIONARIES: Record<Locale, Dictionary> = { en, tr };

/**
 * Synchronous by design. Both dictionaries are plain modules bundled with the
 * app rather than JSON fetched at runtime, so pages stay static and there is no
 * loading state to handle. The whole set is a few kilobytes.
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export type { Dictionary };
export { en, tr };
