import rss from '@astrojs/rss';
import { sanityClient } from 'sanity:client';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
  const posts = await sanityClient.fetch(`
    *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      "author": author->name
    }
  `);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt || '',
      pubDate: new Date(post.publishedAt),
      link: `/blog/${post.slug}/`,
      author: post.author || 'Vikas Kumar Mishra',
    })),
    customData: `<language>en-us</language>`,
  });
}