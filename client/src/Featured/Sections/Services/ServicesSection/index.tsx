"use client";

import HeadingText from "@/Featured/Common/HeadingText";
import { ServicesCard } from "@/Featured/Common/ServicesCard";
import { getTranslation } from "intlayer";
import { useLocale } from "next-intlayer";
import { serviceSectionContent } from "@/translations/sections";

const ServiceSection = () => {
  const { locale } = useLocale();

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <section className="container mx-auto py-10 px-6">
      <HeadingText title={t(serviceSectionContent.title)} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-10 px-4">
        {cards.map((item) => (
          <ServicesCard key={item} />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
