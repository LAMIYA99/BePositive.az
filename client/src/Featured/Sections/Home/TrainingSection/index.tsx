"use client";
import HeadingText from "@/Featured/Common/HeadingText";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { HeadingTexts } from "@/translations/heading";
import { ServicesCard } from "@/Featured/Common/ServicesCard";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

interface LocalizedString {
  en: string;
  az: string;
}

interface Training {
  _id: string;
  title: LocalizedString;
  image: string;
  link?: string;
  tags: LocalizedString[];
}

const TrainingSection = () => {
  const { locale } = useLocale();
  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/trainings`);
        if (res.ok) {
          const data = await res.json();
          setTrainings(data);
        }
      } catch (error) {
        console.error("Failed to fetch trainings", error);
      }
    };
    fetchData();
  }, []);

  if (trainings.length === 0) return null;

  return (
    <section className="container mx-auto py-2 lg:py-10   px-6">
      <HeadingText title={t(HeadingTexts.trainingsTitle)} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-5 lg:mt-10">
        {trainings.map((training) => (
          <ServicesCard
            key={training._id}
            title={training.title}
            image={training.image}
            tags={training.tags}
            link={training.link}
          />
        ))}
      </div>
    </section>
  );
};

export default TrainingSection;
