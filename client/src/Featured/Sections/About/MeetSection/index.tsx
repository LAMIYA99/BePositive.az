"use client";

import HeadingText from "@/Featured/Common/HeadingText";
import MeetCard from "@/Featured/Common/MeetCard";
import { getTranslation } from "intlayer";
import { useLocale } from "next-intlayer";
import { meetSectionContent } from "@/translations/sections";

import { useEffect, useState } from "react";

interface TeamMember {
  _id: string;
  name: string;
  role: { en: string; az: string };
  image: string;
}

const MeetSection = () => {
  const { locale } = useLocale();
  const [team, setTeam] = useState<TeamMember[]>([]);

  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setTeam(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      }
    };
    fetchTeam();
  }, []);

  const defaultTeam = [
    {
      image: "/alamdarmanafov.png",
      name: "Alamdar Manafov",
      role: meetSectionContent.roles.ceo,
    },
    {
      image: "/Responsive.png",
      name: "Lamiya Alizada",
      role: meetSectionContent.roles.mernStack,
    },
    {
      image: "/Responsive.png",
      name: "Marvan Mammadli",
      role: meetSectionContent.roles.mernStack,
    },
    {
      image: "/Responsive.png",
      name: "Camil Karimli",
      role: meetSectionContent.roles.marketing,
    },
  ];

  const displayTeam = team.length > 0 ? team : defaultTeam;

  return (
    <section className="container mx-auto py-10">
      <HeadingText title={t(meetSectionContent.title)} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-10 px-4">
        {displayTeam.map((member, i) => (
          <MeetCard
            key={(member as any)._id || i}
            img={member.image}
            name={member.name}
            title={t(member.role)}
          />
        ))}
      </div>
    </section>
  );
};

export default MeetSection;
