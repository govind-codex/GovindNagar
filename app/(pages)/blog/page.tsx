import { appConfig } from "root/project.config";
import { getMediumPosts } from "~/api/medium";
import { generateMetadata } from "~/utils/seo";
import AnimatedBlogPosts, { type SerializablePost } from "./client";

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Technical deep dives, tutorials, and thoughts on software engineering.",
  path: "/blog",
});

export default async function BlogPage() {
  const rawPosts = await getMediumPosts();
  const now = Date.now();

  const posts: SerializablePost[] = rawPosts.map((p) => ({
    ...p,
    pubDate: p.pubDate.toISOString(),
  }));

  return (
    <AnimatedBlogPosts
      posts={posts}
      now={now}
      blogUrl={appConfig.social.github}
    />
  );
}
