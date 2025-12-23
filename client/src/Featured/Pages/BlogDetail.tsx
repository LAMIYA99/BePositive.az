import BlogDetailTemp from "../Templates/BlogDetailTemp";

const BlogDetail = ({ id }: { id: string }) => {
  return (
    <div>
      <BlogDetailTemp id={id} />
    </div>
  );
};

export default BlogDetail;
