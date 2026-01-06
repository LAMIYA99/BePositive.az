"use client";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { useState, useEffect } from "react";
import HeadingText from "@/Featured/Common/HeadingText";
import Accordions from "@/Featured/Components/Accordions";

interface Faq {
  _id: string;
  question: { en: string; az: string };
  answer: { en: string; az: string };
  isActive: boolean;
  order: number;
}

const FaqSection = () => {
  const { locale } = useLocale();
  const [faqs, setFaqs] = useState<Faq[]>([]);

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/faqs");
        if (res.ok) {
          const data = await res.json();
          setFaqs(data.filter((f: Faq) => f.isActive));
        }
      } catch (error) {
        console.error("Error fetching faqs:", error);
      }
    };
    fetchFaqs();
  }, []);

  if (faqs.length === 0) return null;

  return (
    <div className="mt-8 lg:mt-10 container mx-auto px-6">
      <HeadingText title={t({ en: "FAQ", az: "Tez-tez verilən suallar" })} />
      <div className="accordions mt-[13px] lg:mt-[40px] flex flex-col gap-4 w-full">
        {faqs.map((faq) => (
          <Accordions
            key={faq._id}
            title={t(faq.question)}
            desc={t(faq.answer)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
