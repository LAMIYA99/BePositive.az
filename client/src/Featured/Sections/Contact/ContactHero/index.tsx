"use client";
import { useLocale } from "next-intlayer";

const ContactHero = () => {
  const { locale } = useLocale();

  const content = {
    title: {
      en: "Contact Us",
      az: "Bizimlə Əlaqə",
    },
    subtitle: {
      en: "Have a question or want to start a project? We are here to help.",
      az: "Sualınız var və ya layihəyə başlamaq istəyirsiniz? Biz kömək etməyə hazırıq.",
    },
  };

  return (
    <div className="relative pt-32 pb-20 bg-[#0808C1] overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FBE443] opacity-10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white opacity-5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {content.title[locale]}
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
          {content.subtitle[locale]}
        </p>
      </div>
    </div>
  );
};

export default ContactHero;
