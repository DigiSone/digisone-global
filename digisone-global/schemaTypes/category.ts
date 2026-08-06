import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(60),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description shown on category pages',
    }),
    defineField({
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      description: 'Optional hex color for UI (e.g. #2563eb)',
      options: {
        list: [
          { title: 'Blue', value: '#2563eb' },
          { title: 'Indigo', value: '#4f46e5' },
          { title: 'Violet', value: '#7c3aed' },
          { title: 'Pink', value: '#db2777' },
          { title: 'Emerald', value: '#059669' },
          { title: 'Amber', value: '#d97706' },
          { title: 'Rose', value: '#e11d48' },
          { title: 'Cyan', value: '#0891b2' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
