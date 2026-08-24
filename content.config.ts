import { defineCollection, z } from '@nuxt/content';

type SeoCollectionInput = {
	type: 'page' | 'data';
	schema?: z.ZodObject;
};

function asSeoCollection(collection: SeoCollectionInput) {
	const robotsSchema = z.object({
		robots: z.union([z.string(), z.boolean()]).optional(),
	});
	const ogImageSchema = z.object({
		ogImage: z
			.object({
				url: z.string().optional(),
				component: z.string().optional(),
				props: z.record(z.string(), z.any()),
			})
			.optional(),
	});
	const sitemapSchema = z.object({
		sitemap: z
			.object({
				loc: z.string().optional(),
				lastmod: z.date().optional(),
				changefreq: z
					.union([
						z.literal('always'),
						z.literal('hourly'),
						z.literal('daily'),
						z.literal('weekly'),
						z.literal('monthly'),
						z.literal('yearly'),
						z.literal('never'),
					])
					.optional(),
				priority: z.number().optional(),
				images: z
					.array(
						z.object({
							loc: z.string(),
							caption: z.string().optional(),
							geo_location: z.string().optional(),
							title: z.string().optional(),
							license: z.string().optional(),
						}),
					)
					.optional(),
				videos: z
					.array(
						z.object({
							content_loc: z.string(),
							player_loc: z.string().optional(),
							duration: z.string().optional(),
							expiration_date: z.date().optional(),
							rating: z.number().optional(),
							view_count: z.number().optional(),
							publication_date: z.date().optional(),
							family_friendly: z.boolean().optional(),
							tag: z.string().optional(),
							category: z.string().optional(),
							restriction: z
								.object({
									relationship: z.literal('allow').optional(),
									value: z.string().optional(),
								})
								.optional(),
							gallery_loc: z.string().optional(),
							price: z.string().optional(),
							requires_subscription: z.boolean().optional(),
							uploader: z.string().optional(),
						}),
					)
					.optional(),
			})
			.optional(),
	});
	const schemaOrgSchema = z.union([
		z.record(z.string(), z.any()),
		z.array(z.record(z.string(), z.any())),
	]);
	const schema = z.object({
		schemaOrg: schemaOrgSchema.optional(),
	});
	const headSchema = z.object({
		head: z
			.object({
				meta: z.array(z.record(z.string(), z.any())).optional(),
				script: z.array(z.record(z.string(), z.any())).optional(),
			})
			.optional(),
	});
	const seoSchema = z.object({
		...robotsSchema.shape,
		...ogImageSchema.shape,
		...sitemapSchema.shape,
		...schema.shape,
	});

	if (collection.type === 'page') {
		collection.schema = collection.schema
			? seoSchema.extend(collection.schema.shape)
			: seoSchema;

		if (collection.schema && !('head' in collection.schema.shape)) {
			collection.schema = headSchema.extend(collection.schema.shape);
		}
	}

	return collection;
}

const commonContentSchema = z.object({
	title: z.string().nonempty(),
	description: z.string().nonempty(),
	date: z.string().nonempty(),
});

const commonArticleSchema = z.object({
	title: z.string().nonempty(),
	description: z.string().nonempty(),
	date: z.string().nonempty(),
	image: z.string().url(),
	readingTime: z.string().nonempty(),
	tags: z.array(z.string().nonempty()),
});

const commonProjectSchema = z.object({
	name: z.string().nonempty(),
	image: z.string().nonempty().optional(),
	link: z.string().url(),
	release: z.string().nonempty(),
	date: z.string().nonempty().optional(),
	featured: z.boolean().optional(),
	organization: z.string().nonempty().optional(),
	type: z.string().nonempty().optional(),
	summary: z.string().nonempty().optional(),
	details: z.array(z.string().nonempty()).optional(),
	technologies: z.array(z.string().nonempty()).optional(),
});

const commonFaqSchema = z.object({
	title: z.string().nonempty(),
	subtitle: z.string().nonempty(),
	faqQuestions: z.array(
		z.object({
			title: z.string().nonempty(),
			questions: z.array(
				z.object({
					label: z.string().nonempty(),
					content: z.string().nonempty(),
				}),
			),
		}),
	),
});

export const collections = {
	content_en: defineCollection(
		asSeoCollection({
			type: 'page',
			source: {
				include: 'en/**/*.md',
				exclude: ['en/articles/*.md'],
				prefix: '/en',
			},
			schema: commonContentSchema,
		}),
	),
	content_es: defineCollection(
		asSeoCollection({
			type: 'page',
			source: {
				include: 'es/**/*.md',
				exclude: ['es/articles/*.md'],
				prefix: '/es',
			},
			schema: commonContentSchema,
		}),
	),
	articles_en: defineCollection(
		asSeoCollection({
			type: 'page',
			source: {
				include: 'en/articles/*.md',
				prefix: '/en/articles',
			},
			schema: commonArticleSchema,
		}),
	),
	articles_es: defineCollection(
		asSeoCollection({
			type: 'page',
			source: {
				include: 'es/articles/*.md',
				prefix: '/es/articles',
			},
			schema: commonArticleSchema,
		}),
	),
	projects_en: defineCollection(
		asSeoCollection({
			type: 'data',
			source: 'en/projects/*.json',
			schema: commonProjectSchema,
		}),
	),
	projects_es: defineCollection(
		asSeoCollection({
			type: 'data',
			source: 'es/projects/*.json',
			schema: commonProjectSchema,
		}),
	),
	stack: defineCollection({
		type: 'data',
		source: 'stack.json',
		schema: z.object({
			items: z.array(
				z.object({
					name: z.string().nonempty(),
					link: z.string().url(),
					icon: z.string().nonempty(),
				}),
			),
		}),
	}),
	faq_en: defineCollection({
		type: 'data',
		source: 'en/faq.json',
		schema: commonFaqSchema,
	}),
	faq_es: defineCollection({
		type: 'data',
		source: 'es/faq.json',
		schema: commonFaqSchema,
	}),
};
