import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    excerpt: z.string(),
    order: z.number(),
    symptoms: z.array(z.string()).optional(),
  }),
});

const testimonials = defineCollection({
  loader: file('src/content/testimonials/testimonials.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    service: z.string(),
    date: z.string(),
    location: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: file('src/content/team/team.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    certifications: z.array(z.string()).optional(),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq/faq.json'),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    category: z.string(),
  }),
});

const gallery = defineCollection({
  loader: file('src/content/gallery/gallery.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    service: z.string(),
    description: z.string(),
  }),
});

export const collections = { services, testimonials, team, faq, gallery };
