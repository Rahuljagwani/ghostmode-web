import { LocalizedBlogPost, localizedPostMetadata, localizedPostParams } from "@/components/LocalizedBlog";

// Scheduled posts aren't built until they go live, so check for newly published ones every 10 minutes.
export const revalidate = 600;

export function generateStaticParams() {
  return localizedPostParams("es");
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return localizedPostMetadata("es", params.slug);
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <LocalizedBlogPost lang="es" slug={params.slug} />;
}
