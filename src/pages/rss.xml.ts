import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }: CollectionEntry<"blog">) => !data.draft))
    .sort((a: CollectionEntry<"blog">, b: CollectionEntry<"blog">) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "Glade Francis",
    description:
      "Notes on software architecture, building with AI, and small business operations.",
    site: context.site!,
    items: posts.map((post: CollectionEntry<"blog">) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id.replace(/\.md$/, "")}/`,
    })),
  });
}
