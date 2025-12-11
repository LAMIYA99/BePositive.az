"use client";

import { getTranslation } from "intlayer";
import { useLocale } from "next-intlayer";

const ReviewCard = ({ review }: { review: any }) => {
  const { locale } = useLocale();
  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-3xl bg-white lg:p-6 p-2 min-h-[352px]">
      <div className="w-[76px] h-[76px] border-2 rounded-full overflow-hidden border-[#0808C1]">
        <img
          src={review.avatar}
          alt={t(review.name)}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-[16px] text-[#364153] font-normal leading-[26px] tracking-[-0.312px] text-center w-[321px]">
        "{t(review.text)}"
      </p>

      <ul className="flex items-center flex-col">
        <li className="text-[#101828] text-[16px] font-normal leading-6 tracking-[-0.312px]">
          {t(review.name)}
        </li>
        <li className="text-[#6A7282] text-[14px] font-normal leading-5 tracking-[-0.15px]">
          {t(review.role)}
        </li>
      </ul>
    </div>
  );
};

export default ReviewCard;
