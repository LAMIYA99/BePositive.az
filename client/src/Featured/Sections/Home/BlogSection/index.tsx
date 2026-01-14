"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "@/Featured/Common/BlogCard";
import HeadingText from "@/Featured/Common/HeadingText";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { HeadingTexts } from "@/translations/heading";
import { API_URL } from "@/lib/api";

import Link from "next/link";
import { getLocalizedUrl } from "intlayer";

interface Blog {
  _id: string;
  title: { en: string; az: string };
  excerpt: { en: string; az: string };
  image: string;
}

const BlogSection = () => {
  const { locale } = useLocale();
  const t = (content: { en: string; az: string }) =>
    getTranslation(content, locale);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data.slice(0, 3));
        else setError(true);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  if (error) return null;

  return (
    <section className="container mx-auto mt-8 lg:py-10  px-6">
      <HeadingText title={t(HeadingTexts.blogTitle)} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4 lg:mt-10  ">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href={getLocalizedUrl("/Blog", locale)}>
          <button className="px-8 py-3 rounded-[50px] bg-[#0707B0] text-white font-inter text-[18px] font-medium cursor-pointer hover:bg-[#FBE443] hover:text-black duration-300">
            {t(HeadingTexts.seeAll)}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
