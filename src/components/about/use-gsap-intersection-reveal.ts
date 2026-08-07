"use client";

import { gsap } from "gsap";
import { useCallback, useLayoutEffect, type RefObject } from "react";

type UseGsapIntersectionRevealOptions<T extends Element> = {
  scopeRef: RefObject<Element | null>;
  targetsRef: RefObject<(T | null)[]>;
  threshold: number;
  setInitialState: (targets: T[]) => void;
  animateIn: (targets: T[]) => void;
  resetKey?: unknown;
};

export default function useGsapIntersectionReveal<T extends Element>({
  scopeRef,
  targetsRef,
  threshold,
  setInitialState,
  animateIn,
  resetKey,
}: UseGsapIntersectionRevealOptions<T>) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    const targets = targetsRef.current.filter(Boolean) as T[];

    // Deliberately narrower than the shared shouldReduceEffects helper, which
    // also treats any touch device as reduced. Only an explicit motion
    // preference should skip the reveal; bailing before setInitialState leaves
    // the content in its natural, already-visible state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!scope || !targets.length) {
      return;
    }

    let observer: IntersectionObserver | null = null;

    const context = gsap.context((self) => {
      setInitialState(targets);

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) {
            return;
          }

          observer?.disconnect();
          observer = null;
          // Routed back through the context: gsap.context only collects
          // animations created during its synchronous run, so tweens started
          // from this async callback escaped it and survived context.revert().
          // `self` is used rather than the outer binding, which is not assigned
          // yet while this callback is being set up.
          self.add(() => {
            animateIn(targets);
          });
        },
        { threshold },
      );

      observer.observe(scope);
    }, scope);

    return () => {
      observer?.disconnect();
      context.revert();
    };
  }, [animateIn, resetKey, scopeRef, setInitialState, targetsRef, threshold]);

  /**
   * The `ref` callback that collects reveal targets by index.
   *
   * Detaching used to `splice`, which shifts every later entry down a slot, so
   * index N would start answering for the node that had been at N+1. Writing
   * `null` keeps the index-to-node mapping stable; the effect above filters the
   * holes out.
   */
  return useCallback(
    (index: number) => (node: T | null) => {
      targetsRef.current[index] = node;
    },
    [targetsRef],
  );
}
