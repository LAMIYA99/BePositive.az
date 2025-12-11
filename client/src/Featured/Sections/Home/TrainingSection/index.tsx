"use client";
import HeadingText from "@/Featured/Common/HeadingText";
import TrainingCard from "@/Featured/Common/TrainingCard";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { HeadingTexts } from "@/translations/heading";

const TrainingSection = () => {
  const { locale } = useLocale();

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  const cards = [1, 2, 3];

  return (
    <section className="container mx-auto py-10 px-6">
      <HeadingText title={t(HeadingTexts.trainingsTitle)} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-10">
        {cards.map((item) => (
          <TrainingCard key={item} />
        ))}
      </div>
    </section>
  );
};

export default TrainingSection;
