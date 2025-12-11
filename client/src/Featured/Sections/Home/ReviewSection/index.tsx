"use client";

import HeadingText from "@/Featured/Common/HeadingText";
import ReviewCard from "@/Featured/Common/ReviewCards";
import { HeadingTexts } from "@/translations/heading";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { reviewsContent } from "@/translations/sections";

const ReviewSection = () => {
  const { locale } = useLocale();
  const t = (c: { en: string; az: string }) => getTranslation(c, locale);

  return (
    <div className="mt-[72px] container mx-auto px-6">
      <HeadingText title={t(HeadingTexts.reviewsTitle)} />

      <div className="flex flex-wrap justify-center items-center gap-[58px] mt-10">
        {reviewsContent.map((item: any) => (
          <ReviewCard key={item.id} review={item} />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
