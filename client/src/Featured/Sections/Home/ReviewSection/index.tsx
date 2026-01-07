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
    <div className="mt-[22px] lg:mt-[52px] container mx-auto px-6">
      <HeadingText title={t(HeadingTexts.reviewsTitle)} />

      <div className="flex flex-wrap  justify-center items-center gap-6 mt-5 lg:mt-10  ">
        {reviewsContent.map((item: any) => (
          <ReviewCard key={item.id} review={item} />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
