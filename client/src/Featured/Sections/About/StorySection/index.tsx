"use client";

import HeadingText from "@/Featured/Common/HeadingText";
import { getTranslation } from "intlayer";
import { useLocale } from "next-intlayer";
import { storySectionContent } from "@/translations/sections";

const StorySection = () => {
  const { locale } = useLocale();

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  return (
    <section className="container mx-auto py-10 px-4 md:px-0">
      <div className="text-center text-[#0707B0] font-inter flex flex-col gap-4 md:gap-[22px]">
        <h1 className="text-[24px] md:text-[36px] font-bold">
          {t(storySectionContent.aboutTitle)}
        </h1>
        <h2 className="text-[16px] md:text-[24px] font-normal leading-tight md:leading-6">
          {t(storySectionContent.aboutSubtitle)}
        </h2>
      </div>

      <div className="mt-10 md:mt-20 flex flex-col gap-4 md:gap-[18px] items-center">
        <HeadingText title={t(storySectionContent.storyTitle)} />
        <p className="font-inter text-[16px] md:text-[24px] font-medium leading-[24px] md:leading-[34px] text-[#414141] text-center">
          {t(storySectionContent.storyDescription)}
        </p>
      </div>
    </section>
  );
};

export default StorySection;
