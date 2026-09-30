import "server-only";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as z from "zod";
import type { ResolvedDocsVersion } from "./docs-versions";
import { docsVersions } from "./docs-versions";

const releaseVersionsSchema = z.record(z.string(), z.string());

export function loadDocsVersions(): ResolvedDocsVersion[] {
	const metadataPath = join(
		process.cwd(),
		"content",
		"_generated",
		"docs",
		"release-versions.json",
	);
	let releaseVersions: Record<string, string> = {};
	try {
		if (existsSync(metadataPath)) {
			releaseVersions = releaseVersionsSchema.parse(
				JSON.parse(readFileSync(metadataPath, "utf8")),
			);
		}
	} catch {
		// Use releaseLine fallback if metadata file is unavailable
	}

	return docsVersions.map((version) => {
		const releaseVersion = releaseVersions[version.id] ?? version.releaseLine;
		return { ...version, releaseVersion };
	});
}
