"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MobileMenu = ({
  navLinks,
  t,
  uiLocale,
  locale,
  languageList,
  handleSelect,
  close,
}: any) => {
  return (
    <AnimatePresence>
      <motion.div
        className="bg-[#0000008c] fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => close()}
      >
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[342px] bg-white shadow-lg flex flex-col items-start rounded-2xl px-3 py-0.5 gap-1 md:hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col px-4 py-[18px] items-start gap-6 text-[16px] font-inter font-normal">
            {navLinks.map((item: any) => (
              <li
                key={item.title}
                className="cursor-pointer p-2.5 border-b border-[#F1F1F1] hover:border-y-amber-400"
              >
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <div className="px-4 py-3 flex items-start flex-col gap-[22px]">
            <Link href="/Contact">
              <button className="px-5  min-w-[90px] h-8 rounded-[50px] bg-[#0707B0] text-white font-inter text-[16px] font-normal cursor-pointer hover:bg-[#FBE443] hover:text-black duration-300">
                {t({ en: "Contact", az: "Əlaqə" })}
              </button>
            </Link>
            <h2 className="text-[#4A5565] text-[16px]">{t({ en: "Select language", az: "Dil seçin" })}</h2>
            <div className="flex items-center gap-3">
              {languageList.map((lang: any) => (
                <button
                  key={lang.code}
                  className="flex items-center justify-center w-[142px] px-4 py-3 gap-2 border border-[#E5E7EB] hover:bg-[#155DFC] hover:text-white rounded-2xl"
                  onClick={() => handleSelect(lang.code)}
                >
                  <Image src={lang.img} alt={lang.label} width={32} height={32} className="w-8 h-8 object-contain" />
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu;
