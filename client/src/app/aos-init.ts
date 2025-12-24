"use client";
import { useEffect } from "react";

export default function AosInit() {
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen =
      typeof window !== "undefined" && window.innerWidth < 768;

    let canceled = false;

    // Lazy-load AOS to keep it out of the critical path
    import("aos").then(({ default: AOS }) => {
      if (canceled) return;
      AOS.init({
        duration: 800,
        once: true,
        // Only disable animations for users who prefer reduced motion
        disable: prefersReducedMotion,
      });
    });

    return () => {
      canceled = true;
    };
  }, []);

  return null;
}
