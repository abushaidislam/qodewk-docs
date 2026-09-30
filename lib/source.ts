import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { docs } from "@/.source/server";
import type { DocsVersionId } from "./docs-versions";
import { pageTreePlugin } from "./page-tree";

const docsPlugins = [pageTreePlugin(), lucideIconsPlugin()];

export const source = loader({
	baseUrl: "/docs",
	source: docs.toFumadocsSource(),
	pageTree: { noRef: true },
	plugins: docsPlugins,
});

const docsSources = {
	latest: source,
} satisfies Record<DocsVersionId, typeof source>;

export function getSourceFor(versionId: DocsVersionId) {
	return docsSources[versionId] ?? source;
}
