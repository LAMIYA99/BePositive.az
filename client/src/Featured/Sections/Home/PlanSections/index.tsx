"use client";

import HeadingText from "@/Featured/Common/HeadingText";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { useState } from "react";
import { HeadingTexts } from "@/translations/heading";
import { planContent } from "@/translations/sections";
import { planCardContent } from "@/translations/components";

const PlanSections = () => {
  const { locale } = useLocale();
  const t = (content: any) => getTranslation(content, locale);

  const [selectedPlan, setSelectedPlan] = useState<string | null>("monthly");

  const buttons = [
    { id: "monthly", label: t(planContent.buttons.monthly) },
    { id: "sixMonth", label: t(planContent.buttons.sixMonth) },
    { id: "yearly", label: t(planContent.buttons.yearly) },
  ];

  const cardList = [
    { key: "free", data: planCardContent.cards.free },
    { key: "professional", data: planCardContent.cards.professional },
    { key: "enterprise", data: planCardContent.cards.enterprise },
  ];

  return (
    <section className="container mx-auto mt-[72px] px-6">
      <div className="flex items-center justify-center flex-col gap-10">
        <div data-aos="fade-down" data-aos-duration="1200">
          <HeadingText title={t(HeadingTexts.plansTitle)} />
        </div>

        <div className="flex items-center gap-[15px] lg:gap-[21px]">
          {buttons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setSelectedPlan(btn.id)}
              className={`h-14 px-6 lg:px-8 py-2 rounded-2xl border duration-300 cursor-pointer text-[#010101] lg:text-[20px] text-[12px]
                ${
                  selectedPlan === btn.id
                    ? "bg-[#0707B0] text-white"
                    : "bg-transparent hover:bg-[#0707B0] hover:text-white border-[#0808C1]"
                }
              `}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
          {cardList.map(({ key, data }: any) => (
            <div
              key={key}
              data-aos="fade-right"
              className="pl-[27px] lg:pl-[111px] pt-[82px] pb-[83px] pr-[27px] flex flex-col items-start justify-center rounded-3xl bg-white shadow-[0_2px_12.4px_rgba(178,178,236,0.24)] group duration-400 cursor-pointer hover:bg-[#0808C1] hover:scale-[1.05]"
            >
              <h2 className="text-[#060689] font-space-grotesk text-[42px] font-bold mb-[33px] group-hover:text-white duration-400">
                {t(data.title)}
              </h2>

              <p className="text-[#B2B2EC] text-[22px] mb-[57px] leading-7 font-medium group-hover:text-white">
                {t(data.desc)}
              </p>

              <div className="mb-[35px]">
                <h3 className="text-[50px] font-medium text-[#060689] group-hover:text-white duration-400">
                  {t(data.price)}
                  {data.period && (
                    <span className="text-[20px] pl-8 group-hover:text-white duration-400">
                      {t(data.period)}
                    </span>
                  )}
                </h3>
              </div>

              <ul className="flex flex-col gap-[15px] mb-[42px]">
                {Object.values(data.features).map((f, i) => (
                  <li className="flex items-center gap-3.5" key={i}>
                    <span className="bg-[#DBFFE4] w-8 h-8 rounded-2xl p-1 flex items-center justify-center group-hover:bg-white duration-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        className="fill-[#449C4D] group-hover:fill-[#060689] duration-300"
                      >
                        <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" />
                      </svg>
                    </span>
                    <h2 className="text-[20px] text-[#8D8DE2] group-hover:text-white duration-400">
                      {t(f)}
                    </h2>
                  </li>
                ))}
              </ul>

              <button
                className={`w-[263px] h-16 p-2 flex items-center justify-center rounded-[50px] font-medium duration-400 cursor-pointer
                  ${
                    key === "enterprise"
                      ? "bg-[#FEF7C3] text-[#0808C1] group-hover:bg-white"
                      : "bg-[#E6E6F9] text-[#0808C1] group-hover:bg-white"
                  }
                `}
              >
                {t(data.button)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanSections;
