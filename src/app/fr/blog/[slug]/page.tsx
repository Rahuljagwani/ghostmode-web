import { LocalizedBlogPost, localizedPostMetadata, localizedPostParams } from "@/components/LocalizedBlog";

// Scheduled posts aren't built until they go live, so check for newly published ones every 10 minutes.
export const revalidate = 600;

export function generateStaticParams() {
  return localizedPostParams("fr");
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return localizedPostMetadata("fr", params.slug);
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <LocalizedBlogPost lang="fr" slug={params.slug} />;
}
