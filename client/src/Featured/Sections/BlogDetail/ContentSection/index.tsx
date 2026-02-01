"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeadingText from "@/Featured/Common/HeadingText";
import { Calendar, Clock } from "lucide-react";
import { useLocale } from "next-intlayer";
import { motion, AnimatePresence } from "framer-motion";
import { useAppLoading } from "@/Provider/AppLoaderProvider";
import { API_URL } from "@/lib/api";

import { useQuery } from "@tanstack/react-query";

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

const fetchBlog = async (id: string): Promise<Blog> => {
  const res = await fetch(`/api/blogs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
};

const ContentSection = ({ id }: { id: string }) => {
  const { locale } = useLocale();
  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 animate-pulse space-y-8">
        <div className="h-10 bg-slate-100 rounded-xl w-1/4" />
        <div className="h-20 bg-slate-100 rounded-2xl w-3/4" />
        <div className="h-[400px] bg-slate-100 rounded-3xl w-full" />
      </div>
    );
  }

  if (isError || !blog) {
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
              { day: "numeric", month: "short", year: "numeric" },
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
                  0,
                ) || 0) /
                  200,
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 620px"
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
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 620px"
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 620px"
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
