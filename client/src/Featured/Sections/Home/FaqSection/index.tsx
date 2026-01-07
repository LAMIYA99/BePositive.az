"use client";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import HeadingText from "@/Featured/Common/HeadingText";
import Accordions from "@/Featured/Components/Accordions";
import { accordionsData } from "@/translations/sections";

const FaqSection = () => {
  const { locale } = useLocale();
  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  return (
    <div className="mt-8 lg:mt-[52px] container mx-auto px-6">
      <HeadingText title={t({ en: "FAQ", az: "Tez-tez verilən suallar" })} />
      <div className="accordions mt-[13px] lg:mt-[53px]  flex flex-col gap-4 w-full">
        {accordionsData.map((acc: any) => (
          <Accordions key={acc.id} title={t(acc.title)} desc={t(acc.desc)} />
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
