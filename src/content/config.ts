import { defineCollection, z } from 'astro:content';

// Définition du schéma pour la collection de blog
export const collections = {
  'blog': defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      tags: z.array(z.string()),
      image: z.string().optional(),
      author: z.string().optional(),
    }),
  }),
};
