"use client";

import dynamic from "next/dynamic";
import { getLocalizedUrl, getLocaleName, getTranslation } from "intlayer";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intlayer";
import { useAppLoading } from "@/Provider/AppLoaderProvider";

import { languageContent, navContent } from "@/translations/common";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });

const Header = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [uiLocale, setUiLocale] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();
  const { setLoading } = useAppLoading();

  const handleSelect = (langCode: string) => {
    setOpen(false);
    setMobileMenu(false);
    setUiLocale(langCode);
    setLoading(true);
    setLocale(langCode);

    const target = getLocalizedUrl(pathWithoutLocale ?? "/", langCode);
    if (typeof window !== "undefined") {
      window.location.href = target;
    } else {
      router.replace(target);
    }
  };

  useEffect(() => {
    setMounted(true);
    setUiLocale(locale);
  }, [locale]);

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

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
    [locale, mounted]
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

  if (!mounted) {
    return (
      <header className="container mx-auto flex items-center justify-between py-6 md:py-10 relative px-6 opacity-0" />
    );
  }

  return (
    <header className="container mx-auto flex items-center justify-between py-6 md:py-10 relative px-6">
      <div>
        <Link href={getLocalizedUrl("/", locale)}>
          <Image
            src="/Logo.png"
            alt="Logo"
            width={72}
            height={72}
            className="lg:w-[72px] lg:h-[72px] w-12 h-12 object-contain"
            priority
          />
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-20 max-w-full">
        <ul className="flex gap-14 lg:text-[22px] text-[16px] font-inter font-semibold">
          {navLinks.map((item, index) => (
            <li
              key={item.title}
              className="relative cursor-pointer whitespace-nowrap before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[3px] before:w-full before:bg-[#E5D037] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
            >
              <Link href={getLocalizedUrl(item.href, uiLocale || locale)}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <Link href={getLocalizedUrl("/Contact", uiLocale || locale)}>
          <button className="px-5 py-1 min-w-[140px] h-11 rounded-[50px] bg-[#0707B0] text-white font-inter text-[18px] font-normal cursor-pointer hover:bg-[#FBE443] hover:text-black duration-300">
            {t(navContent.contact)}
          </button>
        </Link>
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
            <Image
              src={
                languageList.find((l) => l.code === (uiLocale || locale))
                  ?.img ?? "/en.png"
              }
              alt={getLocaleName(uiLocale || locale)}
              width={32}
              height={32}
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
                  <Image
                    src={lang.img}
                    alt={getLocaleName(lang.code)}
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] object-contain"
                  />
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
            <path
              d="M4 5H20"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12H20"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 19H20"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {mobileMenu && (
        <MobileMenu
          navLinks={navLinks}
          t={t}
          uiLocale={uiLocale}
          locale={locale}
          languageList={languageList}
          handleSelect={handleSelect}
          close={() => setMobileMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
