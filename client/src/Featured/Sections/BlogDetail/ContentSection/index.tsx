"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeadingText from "@/Featured/Common/HeadingText";
import { Calendar, Clock } from "lucide-react";
import { useLocale } from "next-intlayer";
import { motion, AnimatePresence } from "framer-motion";
import { useAppLoading } from "@/Provider/AppLoaderProvider";
import { API_URL } from "@/lib/api";

interface LocalizedString {
  en: string;
  az: string;
}

interface Section {
  content: LocalizedString;
  image?: string;
}

interface Blog {
  _id: string;
  title: LocalizedString;
  content: LocalizedString;
  sections?: Section[];
  createdAt: string;
  category?: string[];
  image: string;
  image2?: string;
}

const ContentSection = ({ id }: { id: string }) => {
  const { locale } = useLocale();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoadingState] = useState(true);
  const { setLoading } = useAppLoading();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(`${API_URL}/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
        setLoadingState(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
        setLoadingState(false);
      });
  }, [id]);

  if (loading) {
    return null;
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto py-20 text-center text-gray-500">
        Bloq tapılmadı.
      </div>
    );
  }

  const title = blog.title[locale as "az" | "en"] || blog.title.en;

  return (
    <section className="container font-inter mx-auto pt-10 pb-10 px-4 lg:px-0">
      <HeadingText title="Blog" />

      <div className="flex flex-wrap gap-4 mt-8 mb-10">
        {blog.category?.map((item) => (
          <span
            key={item}
            className="px-4 py-1 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer text-sm"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mb-14">
        <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium text-black leading-tight">
          {title}
        </h1>

        <div className="flex gap-6 mt-4 text-[#6A7282] text-[14px]">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {new Date(blog.createdAt).toLocaleDateString(
              locale === "az" ? "az-AZ" : "en-US",
              { day: "numeric", month: "short", year: "numeric" }
            )}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={16} />{" "}
            {Math.ceil(
              (blog.content[locale as "en" | "az"]?.split(" ").length || 0) /
                200 +
                (blog.sections?.reduce(
                  (acc, s) =>
                    acc +
                    (s.content[locale as "en" | "az"]?.split(" ").length || 0),
                  0
                ) || 0) /
                  200
            ) || 1}{" "}
            min read
          </span>
        </div>
      </div>

      <article className="text-[#414141] text-[18px] md:text-[20px] lg:text-[24px] leading-8 md:leading-9 whitespace-pre-wrap">
        {blog.sections && blog.sections.length > 0 ? (
          blog.sections.map((section, idx) => {
            const sectionContent =
              section.content[locale as "az" | "en"] || section.content.en;
            const isEven = idx % 2 === 1;

            return (
              <div key={idx} className="mb-12 md:mb-16 last:mb-0">
                {section.image && (
                  <div
                    className={`
                    relative w-full aspect-video lg:aspect-auto lg:h-[400px] mb-6 lg:mb-0
                    ${
                      isEven
                        ? "lg:float-left lg:mr-10"
                        : "lg:float-right lg:ml-10"
                    }
                    lg:w-[620px]
                  `}
                  >
                    <Image
                      src={section.image}
                      alt={`Section ${idx + 1}`}
                      fill
                      className="rounded-3xl object-cover"
                    />
                  </div>
                )}
                <p className="antialiased">{sectionContent}</p>
                <div className="clear-both" />
              </div>
            );
          })
        ) : (
          <>
            <div className="relative w-full aspect-video lg:aspect-auto lg:h-[400px] lg:float-right lg:ml-10 lg:mb-6 lg:w-[620px] mb-6">
              <Image
                src={blog.image || "/download.png"}
                alt={title}
                fill
                className="rounded-3xl object-cover shadow-lg"
                priority
              />
            </div>
            <p className="antialiased">
              {blog.content[locale as "az" | "en"] || blog.content.en}
            </p>
            <div className="clear-both" />

            {blog.image2 && (
              <div className="mt-12 md:mt-16">
                <div className="relative w-full aspect-video lg:aspect-auto lg:h-[400px] lg:float-left lg:mr-10 lg:mb-6 lg:w-[620px] mb-6">
                  <Image
                    src={blog.image2}
                    alt={title}
                    fill
                    className="rounded-3xl object-cover"
                  />
                </div>
                <div className="clear-both" />
              </div>
            )}
          </>
        )}
      </article>
      <p className="mt-10 text-[#414141] font-normal text-[18px] md:text-[20px] lg:text-[24px] leading-8 md:leading-9">
        Author <br /> @alamdarmanafov. Ələmdar Manafov
      </p>
    </section>
  );
};

export default ContentSection;
