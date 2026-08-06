import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When this post was / will be published',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on blog cards (max \~160 characters recommended)',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'Artificial Intelligence', value: 'Artificial Intelligence' },
          { title: 'Business Strategy', value: 'Business Strategy' },
          { title: 'Startups', value: 'Startups' },
          { title: 'Cybersecurity', value: 'Cybersecurity' },
          { title: 'Cloud Computing', value: 'Cloud Computing' },
          { title: 'Future of Work', value: 'Future of Work' },
          { title: 'Creator Economy', value: 'Creator Economy' },
          { title: 'Digital Transformation', value: 'Digital Transformation' },
        ],
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Vikas Mishra',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const { author, date } = selection
      return {
        ...selection,
        subtitle: `${author || 'No author'} • ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
      }
    },
  },
})
