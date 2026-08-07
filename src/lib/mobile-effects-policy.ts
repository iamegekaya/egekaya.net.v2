const COARSE_POINTER_QUERY = "(pointer: coarse)";
const NARROW_VIEWPORT_QUERY = "(max-width: 820px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export type MobileEffectsQueries = {
  coarsePointerQuery: MediaQueryList;
  narrowViewportQuery: MediaQueryList;
  reducedMotionQuery: MediaQueryList;
};

export function createMobileEffectsQueries(): MobileEffectsQueries {
  return {
    coarsePointerQuery: window.matchMedia(COARSE_POINTER_QUERY),
    narrowViewportQuery: window.matchMedia(NARROW_VIEWPORT_QUERY),
    reducedMotionQuery: window.matchMedia(REDUCED_MOTION_QUERY),
  };
}

export function getMobileEffectsPolicyState({
  coarsePointerQuery,
  narrowViewportQuery,
  reducedMotionQuery,
}: MobileEffectsQueries) {
  const isTouchOptimizedMode = coarsePointerQuery.matches || narrowViewportQuery.matches;
  const prefersReducedMotion = reducedMotionQuery.matches;

  return {
    isTouchOptimizedMode,
    prefersReducedMotion,
    shouldReduceEffects: isTouchOptimizedMode || prefersReducedMotion,
  };
}

export function subscribeToMobileEffectsPolicy(
  queries: MobileEffectsQueries,
  onChange: () => void,
) {
  // The deprecated addListener/removeListener fallback is gone: every browser
  // this site targets has supported MediaQueryList.addEventListener since
  // Safari 14, so that path was unreachable. Iterating the three queries also
  // replaces the block that repeated each subscription by hand.
  const watched = Object.values(queries);

  for (const query of watched) {
    query.addEventListener("change", onChange);
  }

  return () => {
    for (const query of watched) {
      query.removeEventListener("change", onChange);
    }
  };
}
