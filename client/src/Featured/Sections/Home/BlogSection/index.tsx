"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "@/Featured/Common/BlogCard";
import HeadingText from "@/Featured/Common/HeadingText";
import { useLocale } from "next-intlayer";
import { getTranslation } from "intlayer";
import { HeadingTexts } from "@/translations/heading";
import { API_URL } from "@/lib/api";

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
    fetch(`${API_URL}/api/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data.slice(0, 4));
        else setError(true);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  if (error) return null;

  return (
    <section className="container mx-auto py-2 lg:py-10  px-6">
      <HeadingText title={t(HeadingTexts.blogTitle)} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-5 lg:mt-10  ">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
