import BlogDetail from "@/Featured/Pages/BlogDetail";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetail id={slug} />;
}
