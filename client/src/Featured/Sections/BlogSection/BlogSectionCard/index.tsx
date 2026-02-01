"use client";
import React from "react";
import BlogCard from "@/Featured/Common/BlogCard";
import HeadingText from "@/Featured/Common/HeadingText";
import { useQuery } from "@tanstack/react-query";

interface Blog {
  _id: string;
  title: { en: string; az: string };
  excerpt: { en: string; az: string };
  image: string;
  slug?: string;
}

const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await fetch("/api/blogs");
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

const BlogScTCard = () => {
  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  return (
    <section className="container mx-auto py-10 px-6">
      <HeadingText title="Blog" />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-10 px-4">
        {isError && (
          <p className="text-center text-red-500 col-span-full">
            Failed to load blogs.
          </p>
        )}
        {isLoading &&
          [...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] bg-slate-50 animate-pulse rounded-3xl"
            />
          ))}
        {!isLoading && !isError && blogs.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No blogs found.
          </p>
        )}
        {!isLoading &&
          !isError &&
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </section>
  );
};

export default BlogScTCard;
