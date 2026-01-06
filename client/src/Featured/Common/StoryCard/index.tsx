"use client";

import { getTranslation } from "intlayer";
import { useLocale } from "next-intlayer";
import { getImageUrl } from "@/lib/utils";

interface StoryCardProps {
  title: { en: string; az: string };
  image: string;
  tags: { en: string; az: string }[];
}

const StoryCard = ({ title, image, tags }: StoryCardProps) => {
  const { locale } = useLocale();

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  return (
    <div
      data-aos="zoom-in-left"
      className="
    relative 
    rounded-2xl 
    overflow-hidden 
    group 
    cursor-pointer 
    shadow-md 
    bg-gray-200

    h-60          
    sm:h-[280px]    
    lg:h-80     
  "
    >
      <div
        className="
      absolute inset-0 
      bg-cover bg-center 
      transition-transform duration-500 
      group-hover:scale-110
    "
        style={{ backgroundImage: `url("${getImageUrl(image)}")` }}
      />

      <div
        className="
      absolute 
      bottom-0 left-0 
      w-full 

      p-4 sm:p-5 lg:p-6
      flex flex-col gap-3

      text-white 
      bg-linear-to-t from-black/80 to-transparent

      translate-y-8 opacity-0 
      group-hover:translate-y-0 group-hover:opacity-100
      transition-all duration-500
    "
      >
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="
            flex items-center justify-center 
            rounded-full border border-white 
            backdrop-blur-sm font-medium

            h-6 sm:h-7 lg:h-8
            px-3 sm:px-4 lg:px-5

            text-[10px] sm:text-[11px] lg:text-[12px]
            leading-none
          "
            >
              {t(tag)}
            </span>
          ))}
        </div>

        <p
          className="
        mt-1 font-medium

        text-[16px] leading-5      
        sm:text-[18px] sm:leading-[22px] 
        lg:text-[22px] lg:leading-7 
      "
        >
          {t(title)}
        </p>

        <div
          className="
        absolute 
        bottom-5 right-5 
        sm:bottom-6 sm:right-6 
        lg:bottom-8 lg:right-8
      "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 41 41"
            className="
          w-5 h-5 
          sm:w-6 sm:h-6 
          lg:w-8 lg:h-8
        "
            fill="none"
          >
            <path
              d="M40.5651 1.49997C40.5651 0.671545 39.8935 -2.80897e-05 39.0651 -2.91434e-05L25.5651 -2.72889e-05C24.7367 -2.86376e-05 24.0651 0.671545 24.0651 1.49997C24.0651 2.3284 24.7367 2.99997 25.5651 2.99997L37.5651 2.99997L37.5651 15C37.5651 15.8284 38.2367 16.5 39.0651 16.5C39.8935 16.5 40.5651 15.8284 40.5651 15L40.5651 1.49997ZM1.06055 39.5045L2.12121 40.5652L40.1258 2.56063L39.0651 1.49997L38.0044 0.439311L-0.000113279 38.4439L1.06055 39.5045Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
