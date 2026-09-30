import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://qodewk.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const basePages: MetadataRoute.Sitemap = [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1.0,
		},
	];

	const docPages: MetadataRoute.Sitemap = await Promise.all(
		source.getPages().map(async (page) => {
			const data = (await page.data.load()) as { lastModified?: string | Date };
			return {
				url: `${BASE_URL}${page.url}`,
				lastModified: data.lastModified ? new Date(data.lastModified) : new Date(),
				changeFrequency: "weekly",
				priority: 0.7,
			};
		}),
	);

	return [...basePages, ...docPages];
}
