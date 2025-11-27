"use client";
import { AccordionsProps } from "@/Types/global";
import { useState } from "react";

const Accordions = ({ title, desc }: AccordionsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <ul
      onClick={() => setOpen(!open)}
      className={`overflow-hidden rounded-3xl  duration-300 cursor-pointer w-full
        ${
          open
            ? "h-[186px] bg-[#0707B0] hover:bg-[#0707B0]"
            : "h-[78px] bg-white hover:bg-[#F6F6E8] "
        }`}
    >
      <li className="h-[78px] flex items-center justify-between w-full pl-9 pr-[61px]">
        <h2
          className={`w-[948px] font-inter text-[20px] leading-[30px] font-semibold  ${
            open ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h2>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="12"
          viewBox="0 0 19 12"
          fill="none"
          className={`duration-300 ${
            open ? "rotate-180 fill-white" : "fill-black"
          }`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.00421 0C0.222399 0 -0.669935 2.15428 0.589995 3.41421L7.76157 10.5858C8.54262 11.3668 9.80895 11.3668 10.59 10.5858L17.7616 3.41422C19.0215 2.15429 18.1292 0 16.3474 0H2.00421Z"
          />
        </svg>
      </li>

      <li
        className={`pl-9 pr-[61px]  transition-all duration-300
          ${open ? "opacity-100 mt-2" : "opacity-0 mt-0"}`}
      >
        <h2 className="w-[1217.067px] font-inter text-[16px] leading-7 font-normal text-white ">
          {desc}
        </h2>
      </li>
    </ul>
  );
};

export default Accordions;
