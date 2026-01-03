"use client";
import HeadingText from "@/Featured/Common/HeadingText";
import { ServicesCard } from "@/Featured/Common/ServicesCard";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { HeadingTexts } from "@/translations/heading";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

interface LocalizedString {
  en: string;
  az: string;
}

interface Service {
  _id: string;
  title: LocalizedString;
  image: string;
  link?: string;
  tags: LocalizedString[];
}

const ServiceSection = () => {
  const { locale } = useLocale();

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/services`);
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };
    fetchData();
  }, []);

  if (services.length === 0) return null;

  return (
    <section className="container mx-auto py-2  lg:py-10 px-6">
      <HeadingText title={t(HeadingTexts.servicesTitle)} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-5 lg:mt-10">
        {services.map((service) => (
          <ServicesCard
            key={service._id}
            title={service.title}
            image={service.image}
            tags={service.tags}
            link={service.link}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
