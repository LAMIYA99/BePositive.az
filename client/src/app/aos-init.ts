"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AosInit() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Load AOS CSS on the client to avoid shipping it in server bundles
    // @ts-ignore: dynamic CSS import
    import("aos/dist/aos.css").catch(() => {});

    let canceled = false;

    requestAnimationFrame(() => {
      import("aos").then(({ default: AOS }) => {
        if (canceled) return;
        AOS.init({
          duration: 600,
          once: true,
          disable: prefersReducedMotion,
          offset: 50, 
          delay: 0,
          easing: "ease-out",
        });
      });
    });

    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        import("aos").then(({ default: AOS }) => {
          AOS.refresh();
        });
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
