"use client";

import HeadingText from "@/Featured/Common/HeadingText";
import ReviewCard from "@/Featured/Common/ReviewCards";
import { HeadingTexts } from "@/translations/heading";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";

interface LocalizedString {
  en: string;
  az: string;
}

interface Review {
  _id: string;
  name: LocalizedString;
  role: LocalizedString;
  text: LocalizedString;
  avatar: string;
}

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const ReviewSection = () => {
  const { locale } = useLocale();
  const t = (c: { en: string; az: string }) => getTranslation(c, locale);

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/reviews`);
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

      <div className="mt-5 lg:mt-10">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-10"
        >
          {reviews.map((item) => (
            <SwiperSlide key={item._id} className="h-auto">
              <ReviewCard review={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSection;
