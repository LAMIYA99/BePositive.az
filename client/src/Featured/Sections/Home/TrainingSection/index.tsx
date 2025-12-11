"use client";
import HeadingText from "@/Featured/Common/HeadingText";
import TrainingCard from "@/Featured/Common/TrainingCard";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { HeadingTexts } from "@/translations/heading";
import ApiServices from "@/Services/api";
import { useQuery } from "@tanstack/react-query";

const TrainingSection = () => {
  const api = new ApiServices("http://localhost:1337/api/");

  const { data } = useQuery({
    queryKey: ["trainingBlog"],
    queryFn: () => api.getData("blogs?populate=*"),
  });
  const { locale } = useLocale();
  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);



  return (
    <section className="container mx-auto py-10 px-6">
      <HeadingText title={t(HeadingTexts.trainingsTitle)} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-10">
        {data?.data?.map((item: any) => {
          const firstImage = item?.img?.[0];
          const imageUrl = firstImage?.url 
            ? `http://localhost:1337${firstImage.url}` 
            : "/pexels.png";

          return (
            <TrainingCard
              key={item?.id}
              image={imageUrl}
              tag={item?.tags ?? []}
              title={item?.title ?? ""}
            />
          );
        })}
      </div>
    </section>
  );
};

export default TrainingSection;
