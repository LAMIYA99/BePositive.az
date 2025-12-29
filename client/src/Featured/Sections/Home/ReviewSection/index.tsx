"use client";

import HeadingText from "@/Featured/Common/HeadingText";
import ReviewCard from "@/Featured/Common/ReviewCards";
import { HeadingTexts } from "@/translations/heading";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

const ReviewSection = () => {
  const { locale } = useLocale();
  const t = (c: { en: string; az: string }) => getTranslation(c, locale);

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/reviews`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };
    fetchData();
  }, []);

  if (reviews.length === 0) return null;

  return (
    <div className="mt-[22px] lg:mt-[52px] container mx-auto px-6">
      <HeadingText title={t(HeadingTexts.reviewsTitle)} />

      <div className="flex flex-wrap  justify-center items-center gap-6 mt-5 lg:mt-10  ">
        {reviews.map((item: any) => (
          <ReviewCard key={item._id} review={item} />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
