// src/lib/posts.ts
import { getCollection } from 'astro:content';
import { sanityClient } from 'sanity:client';
import { CATEGORIES, type Category } from '../data/categories';

export type UnifiedPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: Date;
  imageUrl?: string | null;
  imageAlt?: string;
  authorName?: string;
  categories: string[];
  readingTime: string;
  source: 'sanity' | 'markdown';
  href: string;
};

function readingTimeFromText(text: string, fallbackMins = 1): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(fallbackMins, Math.ceil(words / 180));
  return `${mins} min read`;
}

export async function getAllPosts(): Promise<UnifiedPost[]> {
  // 1. Sanity posts
  const sanityRaw = await sanityClient.fetch(`
    *[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      _createdAt,
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      "authorName": author->name,
      "categories": categories[]->title,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }
  `);

  const sanityPosts: UnifiedPost[] = (sanityRaw || []).map((p: any) => {
    const date = p.publishedAt || p._createdAt;
    return {
      id: p._id,
      title: p.title || 'Untitled',
      slug: p.slug,
      excerpt: p.excerpt || '',
      publishedAt: date ? new Date(date) : new Date(0),
      imageUrl: p.imageUrl || null,
      imageAlt: p.imageAlt || p.title,
      authorName: p.authorName || 'DigiSone Global',
      categories: p.categories || [],
      readingTime:
        p.estimatedReadingTime > 0
          ? `${p.estimatedReadingTime} min read`
          : readingTimeFromText(p.excerpt || ''),
      source: 'sanity' as const,
      href: `/blog/${p.slug}/`,
    };
  });

  // 2. Markdown / MDX posts from content collection
  let markdownPosts: UnifiedPost[] = [];
  try {
    const md = await getCollection('blog');
    markdownPosts = md.map((entry) => {
      const data = entry.data as any;
      const body = typeof entry.body === 'string' ? entry.body : '';
      return {
        id: `md-${entry.id}`,
        title: data.title || 'Untitled',
        slug: entry.id,
        excerpt: data.description || '',
        publishedAt: data.pubDate ? new Date(data.pubDate) : new Date(0),
        imageUrl: data.heroImage?.src || data.heroImage || null,
        imageAlt: data.title,
        authorName: data.author || 'DigiSone Global',
        categories: [], // matched via keywords later
        readingTime: readingTimeFromText(body || data.description || ''),
        source: 'markdown' as const,
        href: `/blog/${entry.id}/`,
      };
    });
  } catch {
    // content collection missing — ignore
  }

  // Merge + dedupe by slug (Sanity wins if conflict)
  const bySlug = new Map<string, UnifiedPost>();
  for (const p of markdownPosts) bySlug.set(p.slug, p);
  for (const p of sanityPosts) bySlug.set(p.slug, p);

  return Array.from(bySlug.values()).sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
  );
}

/** Filter posts that belong to a main category (or optional topic) */
export function filterPostsForCategory(
  posts: UnifiedPost[],
  category: Category,
  topicSlug?: string
): UnifiedPost[] {
  const topicName = topicSlug
    ? category.topics.find((t) => t.slug === topicSlug)?.name?.toLowerCase()
    : null;

  return posts.filter((post) => {
    const haystack = `${post.title} ${post.excerpt} ${post.categories.join(' ')}`.toLowerCase();

    // Sanity exact category match
    const sanityHit = post.categories.some((c) =>
      category.sanityTitles.some((t) => t.toLowerCase() === c.toLowerCase())
    );

    // Keyword match (especially for Markdown posts)
    const keywordHit = category.keywords.some((kw) => haystack.includes(kw.toLowerCase()));

    if (!sanityHit && !keywordHit) return false;

    // If topic selected, further narrow
    if (topicName) {
      return (
        post.categories.some((c) => c.toLowerCase() === topicName) ||
        haystack.includes(topicName) ||
        haystack.includes(topicSlug!.replace(/-/g, ' '))
      );
    }

    return true;
  });
}

export function formatDate(d: Date): string {
  if (!d || d.getTime() === 0) return 'Recently';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
