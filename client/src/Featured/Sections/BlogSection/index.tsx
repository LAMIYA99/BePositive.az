import BlogCard from "@/Featured/Common/BlogCard"
import HeadingText from "@/Featured/Common/HeadingText"

const BlogSection = () => {
  const cards = Array(8).fill(0);

  return (
    <section className="container mx-auto py-10">
      <HeadingText title="Blog" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto mt-10 px-4">
        {cards.map((_, i) => (
          <BlogCard key={i} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
