import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const browser = defineCollection({
	loader: glob({ base: './src/content/browser', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const engineering = defineCollection({
	loader: glob({ base: './src/content/engineering', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const infra = defineCollection({
	loader: glob({ base: './src/content/infra', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const language = defineCollection({
	loader: glob({ base: './src/content/language', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
	}),
});

export const collections = { browser, engineering, infra, language };
