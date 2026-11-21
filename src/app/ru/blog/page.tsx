import { LocalizedBlogIndex, localizedBlogMetadata } from "@/components/LocalizedBlog";

// Picks up scheduled posts as they go live.
export const revalidate = 600;
export const metadata = localizedBlogMetadata("ru");

export default function BlogIndex() {
  return <LocalizedBlogIndex lang="ru" />;
}
