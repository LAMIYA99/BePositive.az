import ContentSection from "../Sections/BlogDetail/ContentSection";

const BlogDetailTemp = ({ id }: { id: string }) => {
  return (
    <div>
      <ContentSection id={id} />
    </div>
  );
};

export default BlogDetailTemp;
