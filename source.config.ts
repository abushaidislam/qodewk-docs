import type { LLMsOptions } from "fumadocs-core/mdx-plugins/remark-llms";
import { pageSchema } from "fumadocs-core/source/schema";
import {
	defineConfig,
	defineDocs,
} from "fumadocs-mdx/config";
import * as z from "zod";

const docsPageSchema = pageSchema.extend({
	sidebarBadge: z.string().min(1).optional(),
	sidebarTitle: z.string().min(1).optional(),
});

const processedMarkdownOptions = {
	mdxAsPlaceholder: ["APIMethod"],
} satisfies LLMsOptions;

export const docs = defineDocs({
	dir: "./content/docs",
	docs: {
		schema: docsPageSchema,
		postprocess: {
			includeProcessedMarkdown: processedMarkdownOptions,
		},
		async: true,
	},
});

export const docsV16 = defineDocs({
	dir: "./content/_generated/docs/v1-6",
	docs: {
		schema: docsPageSchema,
		postprocess: {
			includeProcessedMarkdown: processedMarkdownOptions,
		},
		async: true,
	},
});

export default defineConfig({
	mdxOptions: {
		remarkNpmOptions: {
			persist: {
				id: "persist-install",
			},
		},
	},
});
