"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let canceled = false;

    import("aos").then(({ default: AOS }) => {
      if (canceled) return;
      AOS.init({
        duration: 800,
        once: true,
        disable: prefersReducedMotion,
      });
    });

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    import("aos").then(({ default: AOS }) => {
      AOS.refresh();
    });
  }, [pathname]);

  return null;
}
