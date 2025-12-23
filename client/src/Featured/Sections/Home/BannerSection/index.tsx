"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import { sectionContent } from "@/translations/sections";
import { getTranslation } from "intlayer";
import { useLocale } from "next-intlayer";

const BannerSection = () => {
  const { locale } = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  if (!mounted) {
    return (
      <section className="relative w-full h-[600px] sm:h-[650px] md:h-[700px] lg:h-[750px] overflow-hidden bg-black/80" />
    );
  }

  return (
    <section className="relative w-full h-[600px] sm:h-[650px] md:h-[700px] lg:h-[750px] overflow-hidden flex justify-center items-center">
      <Image
        src="/pexels.png"
        alt="Banner"
        fill
        priority
        sizes="100vw"
        className="object-cover scale-105"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative flex flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 text-center">
        <h1
          data-aos="zoom-in-up"
          className="text-white text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[66px] font-space-grotesk"
        >
          {t(sectionContent.bannerTitle)}
        </h1>

        <p
          data-aos="zoom-in-up"
          data-aos-delay="300"
          className="text-white text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-light leading-6 sm:leading-7 md:leading-8 lg:leading-[38px]"
        >
          {t(sectionContent.bannerSubtitle)}
        </p>
      </div>
    </section>
  );
};

export default BannerSection;
