"use client"
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const [currentLang, setCurrentLang] = useState({
    code: "Az",
    img: "/Aze.png",
  });

  const languages = [
    { code: "Az", img: "/Aze.png" },
    { code: "En", img: "/en.png" },
  ];

  const handleSelect = (lang: any) => {
    setCurrentLang(lang);
    setOpen(false);
  };

  return (
    <header className="container max-w-[1440px]  flex items-center justify-between mx-auto py-10">
      <div
        data-aos="fade-right"
        data-aos-anchor="#example-anchor"
        data-aos-offset="500"
        data-aos-duration="500"
      >
        <img
          src="/Logo.png"
          alt=""
          className="w-[72px] h-[72px] object-contain"
        />
      </div>
      <nav className="w-[846px] flex items-center gap-20">
        <ul className="flex gap-14 text-[22px] font-inter font-semibold">
          <li
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-delay="600"
            data-aos-easing="ease-in-sine"
            className="relative cursor-pointer 
      before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[3px] 
      before:w-full before:bg-[#E5D037] before:scale-x-0 before:origin-left 
      before:transition-transform before:duration-300 hover:before:scale-x-100"
          >
            Home
          </li>

          <li
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-delay="500"
            data-aos-easing="ease-in-sine"
            className="relative cursor-pointer 
      before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[3px] 
      before:w-full before:bg-[#E5D037] before:scale-x-0 before:origin-left 
      before:transition-transform before:duration-300 hover:before:scale-x-100"
          >
            About me
          </li>

          <li
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-delay="400"
            data-aos-easing="ease-in-sine"
            className="relative cursor-pointer 
      before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[3px] 
      before:w-full before:bg-[#E5D037] before:scale-x-0 before:origin-left 
      before:transition-transform before:duration-300 hover:before:scale-x-100"
          >
            Services
          </li>

          <li
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-delay="300"
            className="relative cursor-pointer 
      before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[3px] 
      before:w-full before:bg-[#E5D037] before:scale-x-0 before:origin-left 
      before:transition-transform before:duration-300 hover:before:scale-x-100"
          >
            Blog
          </li>

          <li
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-delay="200"
            className="relative cursor-pointer 
      before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[3px] 
      before:w-full before:bg-[#E5D037] before:scale-x-0 before:origin-left 
      before:transition-transform before:duration-300 hover:before:scale-x-100"
          >
            FAQ
          </li>
        </ul>

        <button
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-delay="100"
          data-aos-easing="ease-in-sine"
          className="px-3 py-2 bg-[#0707B0] cursor-pointer hover:bg-[#0707b0b3] duration-300 text-white w-[120px] h-10 rounded-[50px] text-[16px] font-inter leading-6 font-normal"
        >
          Contact
        </button>
      </nav>

      <div className="relative">
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
    </header>
  );
};

export default Header;
