"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "@/Featured/Common/BlogCard";
import HeadingText from "@/Featured/Common/HeadingText";

interface Blog {
  _id: string;
  title: { en: string; az: string };
  excerpt: { en: string; az: string };
  image: string;
}

const BlogScTCard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setBlogs(data);
        else setError(true);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  return (
    <section className="container mx-auto py-10 px-6">
      <HeadingText title="Blog" />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-10 px-4">
        {error && (
          <p className="text-center text-red-500 col-span-full">
            Failed to load blogs.
          </p>
        )}
        {!error && blogs.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No blogs found.
          </p>
        )}
        {!error && blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </section>
  );
};

export default BlogScTCard;
