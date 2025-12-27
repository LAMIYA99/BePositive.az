"use client";
import HeadingText from "@/Featured/Common/HeadingText";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { HeadingTexts } from "@/translations/heading";
import { ServicesCard } from "@/Featured/Common/ServicesCard";
import { trainingsContent } from "@/translations/sections";

const TrainingSection = () => {
  const { locale } = useLocale();
  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  return (
    <section className="container mx-auto py-2 lg:py-10   px-6">
      <HeadingText title={t(HeadingTexts.trainingsTitle)} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-5 lg:mt-10">
        {trainingsContent.map((training) => (
          <ServicesCard
            key={training.id}
            title={training.title}
            image={training.image}
            tags={training.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default TrainingSection;
