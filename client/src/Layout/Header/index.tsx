"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState({
    code: "Az",
    img: "/Aze.png",
  });

  const pathname = usePathname();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const languages = [
    { code: "Az", img: "/Aze.png" },
    { code: "En", img: "/en.png" },
  ];

  const handleSelect = (lang: any) => {
    setCurrentLang(lang);
    setOpen(false);
  };

  return (
    <header className="container mx-auto flex items-center justify-between py-6 md:py-10 relative  px-6 ">
      <div
        data-aos="fade-right"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        <Link href={"/"}>
          <img
            src="/Logo.png"
            alt="Logo"
            className="lg:w-[72px] lg:h-[72px] w-12 h-12   object-contain"
          />
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-20 w-[846px]">
        <ul className="flex gap-14 text-[22px] font-inter font-semibold">
          {["Home", "About me", "Services", "Blog", "FAQ"].map(
            (item, index) => (
              <li
                key={item}
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-delay={600 - index * 100}
                data-aos-easing="ease-in-sine"
                className="relative cursor-pointer before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[3px] before:w-full before:bg-[#E5D037] before:scale-x-0 before:origin-left before:transition-transform before:duration-300 hover:before:scale-x-100"
              >
                {item === "About me" ? <Link href="/About">{item}</Link> : item}
              </li>
            )
          )}
        </ul>

        <button
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-delay="100"
          data-aos-easing="ease-in-sine"
          className="px-3 py-2 w-[120px] h-10 rounded-[50px] bg-[#0707B0] text-white font-inter text-[16px] leading-6 font-normal cursor-pointer hover:bg-[#FBE443] hover:text-black duration-300"
        >
          Contact
        </button>
      </nav>
      <div className="relative hidden md:block">
        <ul
          className="flex items-center gap-3 w-[97px] justify-center cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <li className="text-[22px] font-inter font-medium leading-[34px] text-black">
            {currentLang.code}
          </li>
          <li>
            <img
              src={currentLang.img}
              alt=""
              className="w-8 h-8 object-contain"
            />
          </li>
        </ul>

        {open && (
          <div className="absolute top-[110%] left-0 bg-white shadow-lg rounded-xl p-3 z-50">
            {languages
              .filter((l) => l.code !== currentLang.code)
              .map((lang) => (
                <div
                  key={lang.code}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => handleSelect(lang)}
                >
                  <span className="text-[18px]">{lang.code}</span>
                  <img
                    src={lang.img}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 5H20"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 12H20"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 19H20"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            className="bg-[#0000008c] fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 9999 }}
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
              <ul className="flex flex-col px-4 py-[18px] items-start gap-6 text-[16px] font-inter font-normal leading-6 tracking-[-0.312px]">
                {["Home", "About me", "Services", "Blog", "FAQ"].map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer p-2.5 border-b hover:border-y-amber-400 border-[#F1F1F1]"
                  >
                    {item === "About me" ? (
                      <Link href="/About">{item}</Link>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
              <div className="px-4 py-3 flex items-start flex-col gap-[22px]">
                <h2 className="text-[#4A5565] text-[16px] font-normal font-inter leading-6 tracking-[-0.312px]">
                  Select Language
                </h2>
                <div className="flex items-center gap-3">
                  <button className="flex items-center justify-center w-[142px] px-4 py-3 gap-2 bg-transparent border border-[#E5E7EB] hover:border-[#155DFC] hover:bg-[#155DFC] rounded-2xl text-black hover:text-white text-[14px] font-normal">
                    <img src="/Aze.png" alt="" className="w-8 h-8" />
                    Azərbaycanca
                  </button>
                  <button className="flex items-center justify-center w-[142px] px-4 py-3 gap-2 bg-transparent border border-[#E5E7EB] hover:border-[#155DFC] hover:bg-[#155DFC] rounded-2xl text-black hover:text-white text-[14px] font-normal">
                    <img src="/en.png" alt="" className="w-8 h-8" />
                    English
                  </button>
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
