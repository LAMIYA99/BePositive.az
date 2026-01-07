import Image from "next/image";

import { MeetCardProps } from "@/Types/global";

const resolveSrc = (src: string) => {
  if (!src) return "/avatar1.jpg";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return src;
  return `/${src}`;
};

const MeetCard = ({ img, name, title }: MeetCardProps) => {
  const safeSrc = resolveSrc(img);

  return (
    <div className="bg-white p-7 rounded-2xl flex flex-col items-center justify-center gap-6">
      <div className="w-[140px] h-[140px] rounded-full overflow-hidden">
        <Image
          src={safeSrc}
          alt={name}
          width={140}
          height={140}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-black text-center text-[24px] font-bold leading-[34px] font-inter">
          {name}
        </h2>
        <h3 className="text-[16px] font-medium text-center text-[#4D4D4D]">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default MeetCard;
