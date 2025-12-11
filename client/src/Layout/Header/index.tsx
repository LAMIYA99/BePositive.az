"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getLocalizedUrl, getLocaleName, getTranslation } from "intlayer";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intlayer";

import { languageContent, navContent } from "@/translations/common";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [uiLocale, setUiLocale] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const { locale, pathWithoutLocale, availableLocales, setLocale } = useLocale();

  // Dil seçimi funksiyası
  const handleSelect = (langCode: string) => {
    setOpen(false);
    setMobileMenu(false);
    setUiLocale(langCode);
    setLocale(langCode);

    const target = getLocalizedUrl(pathWithoutLocale ?? "/", langCode);
    if (typeof window !== "undefined") {
      window.location.href = target;
    } else {
      router.replace(target);
    }
  };

  useEffect(() => {
    setUiLocale(locale);
  }, [locale]);

  const t = (content: { en: string; az: string }) => getTranslation(content, locale);

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const navLinks = useMemo(
    () => [
      { title: t(navContent.home), href: "/" },
      { title: t(navContent.about), href: "/About" },
      { title: t(navContent.services), href: "/Services" },
      { title: t(navContent.blog), href: "/Blog" },
      { title: t(navContent.faq), href: "/Faq" },
    ],
    [locale]
  );

const languageList = useMemo(
  () =>
    availableLocales.map((code) => ({
      code,
      img: code === "az" ? "/Aze.png" : "/en.png",
      label: code.charAt(0).toUpperCase() + code.slice(1).toLowerCase(),
    })),
  [availableLocales]
);

  const resolveLanguageContent = (code: string) =>
    languageContent[code as keyof typeof languageContent] ?? languageContent.en;

  return (
    <header className="container mx-auto flex items-center justify-between py-6 md:py-10 relative px-6">
      <div data-aos="fade-right" data-aos-offset="500" data-aos-duration="500">
        <Link href={getLocalizedUrl("/", locale)}>
          <img
            src="/Logo.png"
            alt="Logo"
            className="lg:w-[72px] lg:h-[72px] w-12 h-12 object-contain"
          />
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-20 max-w-full">
        <ul className="flex gap-14 lg:text-[22px] text-[16px] font-inter font-semibold">
          {navLinks.map((item, index) => (
            <li
              key={item.title}
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-delay={600 - index * 100}
              data-aos-easing="ease-in-sine"
              className="relative cursor-pointer whitespace-nowrap before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[3px] before:w-full before:bg-[#E5D037] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
            >
              <Link href={getLocalizedUrl(item.href, uiLocale || locale)}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <button
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-delay="100"
          data-aos-easing="ease-in-sine"
          className="px-5 py-1 min-w-[140px] h-11 rounded-[50px] bg-[#0707B0] text-white font-inter text-[18px] font-normal cursor-pointer hover:bg-[#FBE443] hover:text-black duration-300"
        >
          {t(navContent.contact)}
        </button>
      </nav>

      <div className="relative hidden md:block">
        <ul
          className="flex items-center gap-3 w-[97px] justify-center cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <li className="text-[22px] font-inter font-medium capitalize">
            {uiLocale || locale}
          </li>
          <li>
            <img
              src={
                languageList.find((l) => l.code === (uiLocale || locale))?.img ?? "/en.png"
              }
              alt={getLocaleName(uiLocale || locale)}
              className="w-8 h-8 object-contain"
            />
          </li>
        </ul>

        {open && (
          <div className="absolute top-[110%] left-0 bg-white shadow-lg rounded-xl p-3 z-50">
            {languageList
              .filter((l) => l.code !== (uiLocale || locale))
              .map((lang) => (
                <div
                  key={lang.code}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => handleSelect(lang.code)}
                >
                  <span className="text-[18px]">{lang.label}</span>
                  <img src={lang.img} className="w-[30px] h-[30px]" />
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center gap-4">
        <div
          className="w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path d="M4 5H20" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12H20" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 19H20" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            className="bg-[#0000008c] fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenu(false)}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[342px] bg-white shadow-lg flex flex-col items-start rounded-2xl px-3 py-0.5 gap-6 md:hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex flex-col px-4 py-[18px] items-start gap-6 text-[16px] font-inter font-normal">
                {navLinks.map((item) => (
                  <li
                    key={item.title}
                    className="cursor-pointer p-2.5 border-b border-[#F1F1F1] hover:border-y-amber-400"
                  >
                    <Link href={getLocalizedUrl(item.href, locale)}>{item.title}</Link>
                  </li>
                ))}
              </ul>

              <div className="px-4 py-3 flex items-start flex-col gap-[22px]">
                <h2 className="text-[#4A5565] text-[16px]">
                  {t(languageContent.selectLanguage)}
                </h2>
                <div className="flex items-center gap-3">
                  {languageList.map((lang) => (
                    <button
                      key={lang.code}
                      className="flex items-center justify-center w-[142px] px-4 py-3 gap-2 border border-[#E5E7EB] hover:bg-[#155DFC] hover:text-white rounded-2xl"
                      onClick={() => handleSelect(lang.code)}
                    >
                      <img src={lang.img} className="w-8 h-8" />
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
