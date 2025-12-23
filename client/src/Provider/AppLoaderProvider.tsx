"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intlayer";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const LoadingContext = createContext({
  setLoading: (loading: boolean) => {},
});

export const useAppLoading = () => useContext(LoadingContext);

const LoadingScreen = ({ locale }: { locale: string }) => (
  <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/40 backdrop-blur-2xl">
    <div className="flex flex-col items-center gap-6">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-24 h-24"
      >
        <Image
          src="/Logo.png"
          alt="Logo"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-slate-100 border-t-[#171ACF] rounded-full animate-spin mb-4" />
        <p className="text-[#171ACF] font-black tracking-widest uppercase text-[10px] animate-pulse">
          {locale === "az" ? "Yüklənir..." : "Loading..."}
        </p>
      </div>
    </div>
  </div>
);

export const AppLoaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(true);
  const pathname = usePathname();
  const { locale } = useLocale();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 600);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  const setLoading = (loading: boolean) => {
    if (loading) {
      setIsLoading(true);
    } else {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const show = isLoading || isNavigating;

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      <div
        className={`transition-all duration-700 ${
          show ? "blur-md scale-[0.98] pointer-events-none" : ""
        }`}
      >
        {children}
      </div>
      <AnimatePresence>
        {show && <LoadingScreen locale={locale} />}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};
