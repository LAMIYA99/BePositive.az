export const navContent = {
  home: { en: "Home", az: "Ana səhifə" },
  about: { en: "About me", az: "Haqqımızda" },
  services: { en: "Services", az: "Xidmətlər" },
  blog: { en: "Blog", az: "Bloq" },
  faq: { en: "FAQ", az: "FAQ" },
  contact: { en: "Contact", az: "Əlaqə" },
} as const;

export const languageContent = {
  selectLanguage: { en: "Select Language", az: "Dili seçin" },
  az: { en: "Az", az: "Az" },
  en: { en: "En", az: "En" },
} as const;

export const footerContent = {
  contactTitle: { en: "Contact", az: "Əlaqə" },
  address: {
    en: "Azerbaijan, Baku, Fuad Ibrahimbayov 13.",
    az: "Azərbaycan, Bakı, Fuad İbrahimbəyov 13.",
  },
  navHome: navContent.home,
  navAbout: navContent.about,
  navServices: navContent.services,
  navBlog: navContent.blog,
  navFaq: navContent.faq,
} as const;
