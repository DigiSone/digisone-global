import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Keep it catchy and premium.',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image (Cover Photo)',
      type: 'image',
      options: {
        hotspot: true, // इससे आप इमेज को क्रॉप और फोकस कर पाएंगे
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (Short Summary)',
      type: 'text',
    }),
    defineField({
      name: 'body',
      title: 'Body (Full Article)',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}], // यह आपको रिच-टेक्स्ट और बीच-बीच में इमेजेस डालने की सुविधा देगा
    }),
  ],
})