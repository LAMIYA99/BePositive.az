"use client";
import HeadingText from "@/Featured/Common/HeadingText";
import TrainingCard from "@/Featured/Common/TrainingCard";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { HeadingTexts } from "@/translations/heading";
import ApiServices from "@/Services/api";
import { useQuery } from "@tanstack/react-query";
import { ServicesCard } from "@/Featured/Common/ServicesCard";

const TrainingSection = () => {

  const { locale } = useLocale();
  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  return (
    <section className="container mx-auto py-10 px-6">
      <HeadingText title={t(HeadingTexts.trainingsTitle)} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-10">
        <ServicesCard />
        <ServicesCard />
        <ServicesCard />
      </div>
    </section>
  );
};

export default TrainingSection;
