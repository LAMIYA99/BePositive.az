import Image from "next/image";
import { getTranslation } from "intlayer";
import { useLocale } from "next-intlayer";
import { getImageUrl } from "@/lib/utils";

const ReviewCard = ({ review }: { review: any }) => {
  const { locale } = useLocale();
  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  return (
    <div className="flex flex-col items-center justify-between rounded-3xl bg-white p-4 lg:p-6 min-h-[352px]">
      <div className="w-[76px] h-[76px] border-2 rounded-full overflow-hidden border-[#0808C1]">
        <Image
          src={getImageUrl(review.avatar)}
          alt={t(review.name)}
          width={76}
          height={76}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex items-center">
        <p className="text-[16px] text-[#364153] font-normal leading-[26px] tracking-[-0.312px] text-center px-4 whitespace-normal wrap-break-word">
          "{t(review.text)}"
        </p>
      </div>

      <ul className="flex items-center flex-col mt-4">
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
