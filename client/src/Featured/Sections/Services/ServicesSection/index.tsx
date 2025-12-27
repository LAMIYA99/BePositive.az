"use client";

import HeadingText from "@/Featured/Common/HeadingText";
import { ServicesCard } from "@/Featured/Common/ServicesCard";
import { getTranslation } from "intlayer";
import { useLocale } from "next-intlayer";
import { servicesContent } from "@/translations/sections";
import { HeadingTexts } from "@/translations/heading";

const ServiceSection = () => {
  const { locale } = useLocale();

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  return (
    <section className="container mx-auto py-10 px-6">
      <HeadingText title={t(HeadingTexts.servicesTitle)} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-10 px-4">
        {servicesContent.map((service) => (
          <ServicesCard
            key={service.id}
            title={service.title}
            image={service.image}
            tags={service.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
