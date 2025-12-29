"use client";

import HeadingText from "@/Featured/Common/HeadingText";
import MeetCard from "@/Featured/Common/MeetCard";
import { getTranslation } from "intlayer";
import { useLocale } from "next-intlayer";
import { meetSectionContent } from "@/translations/sections";

const MeetSection = () => {
  const { locale } = useLocale();

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  const team = [
    {
      img: "/alamdarmanafov.png",
      name: "Alamdar Manafov",
      title: t(meetSectionContent.roles.ceo),
    },
    {
      img: "/Responsive.png",
      name: "Aynur Abdullayeva",
      title: t(meetSectionContent.roles.uiux),
    },
    {
      img: "/Responsive.png",
      name: "Darishova Shabnam",
      title: t(meetSectionContent.roles.uiux),
    },
    {
      img: "/Responsive.png",
      name: "Camil Karimli",
      title: t(meetSectionContent.roles.marketing),
    },
  ];

  return (
    <section className="container mx-auto py-10">
      <HeadingText title={t(meetSectionContent.title)} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-10 px-4">
        {team.map((member, i) => (
          <MeetCard
            key={i}
            img={member.img}
            name={member.name}
            title={member.title}
          />
        ))}
      </div>
    </section>
  );
};

export default MeetSection;
