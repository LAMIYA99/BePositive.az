"use client";
import HeadingText from "@/Featured/Common/HeadingText";
import TrainingCard from "@/Featured/Common/TrainingCard";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { HeadingTexts } from "@/translations/heading";
import ApiServices from "@/Services/api";
import { useQuery } from "@tanstack/react-query";

const TrainingSection = () => {
  const STRAPI_BASE_URL =
    "https://fabulous-excellence-5e42c1cc4f.strapiapp.com";

  const api = new ApiServices(`${STRAPI_BASE_URL}/api/`);

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
          const firstImage = item?.img[0]?.url;

          const imageUrl = firstImage?.url
            ? `${STRAPI_BASE_URL}${firstImage.url}`
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
