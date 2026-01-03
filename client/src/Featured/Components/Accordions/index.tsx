"use client";
import { AccordionsProps } from "@/Types/global";
import { useState } from "react";

const Accordions = ({ title, desc }: AccordionsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ul
      onClick={() => setOpen(!open)}
      className={`overflow-hidden rounded-3xl duration-300 cursor-pointer w-full 
        ${
          open
            ? "h-auto bg-[#0707B0]"
            : "h-[54px] sm:h-[58px] md:h-[78px] bg-white hover:bg-[#F6F6E8]"
        }
      `}
    >
      <li
        className={`flex items-center w-full pl-9 lg:pr-[61px] pr-[20px] 
          ${open ? "justify-between h-auto py-4" : "justify-between h-full"}
        `}
      >
        <h2
          className={`font-inter lg:text-[20px] text-[12px] leading-[30px] font-semibold 
            ${open ? "text-white" : "text-black"}
          `}
        >
          {title}
        </h2>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19 12"
          fill="none"
          className={`duration-300 ${
            open ? "rotate-180 fill-white" : "fill-black"
          } lg:w-[19px] lg:h-3 w-[10px] h-[5px]`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.00421 0C0.222399 0 -0.669935 2.15428 0.589995 3.41421L7.76157 10.5858C8.54262 11.3668 9.80895 11.3668 10.59 10.5858L17.7616 3.41422C19.0215 2.15429 18.1292 0 16.3474 0H2.00421Z"
          />
        </svg>
      </li>

      <li
        className={`pl-9 pr-[61px] transition-all duration-300 
          ${open ? "opacity-100 pb-8" : "opacity-0 mt-0"}
        `}
      >
        <h2
          className="
    font-inter lg:text-[16px] text-[12px] lg:leading-7 leading-5 font-normal text-white
    max-h-[300px] overflow-y-scroll pr-3 hide-scrollbar
  "
        >
          {desc}
        </h2>
      </li>
    </ul>
  );
};

export default Accordions;
