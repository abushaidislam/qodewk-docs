import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: [
			"lucide-react",
			"framer-motion",
			"@radix-ui/react-tabs",
			"@radix-ui/react-scroll-area",
			"@radix-ui/react-popover",
			"@radix-ui/react-select",
			"@radix-ui/react-checkbox",
			"@radix-ui/react-accordion",
			"@radix-ui/react-dialog",
			"@radix-ui/react-dropdown-menu",
			"@radix-ui/react-tooltip",
			"@radix-ui/react-collapsible",
			"@radix-ui/react-separator",
			"date-fns",
		],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "**",
			},
		],
	},
	async redirects() {
		return [
			// Infrastructure backwards compatibility redirects
			{
				source: "/dashboard/:path*",
				destination: "https://dash.better-auth.com",
				permanent: true,
			},
			{
				source: "/docs",
				destination: "/docs/introduction",
				permanent: false,
			},
			// Legacy query string based redirects
			{
				source: "/products",
				has: [{ type: "query", key: "tab", value: "framework" }],
				destination: "/products/framework",
				permanent: true,
			},
			{
				source: "/products",
				has: [{ type: "query", key: "tab", value: "infrastructure" }],
				destination: "/products/infrastructure",
				permanent: true,
			},
			{
				source: "/docs/agent-tools/ask-ai",
				destination: "/docs/ai-resources",
				permanent: true,
			},
			{
				source: "/docs/agent-tools/llms-txt",
				destination: "/llms.txt",
				permanent: true,
			},
			{
				source: "/docs/agent-tools/:path*",
				destination: "/docs/ai-resources/:path*",
				permanent: true,
			},
			{
				source: "/docs/infrastructure/plugins/dash",
				destination: "/docs/infrastructure/plugins/dashboard",
				permanent: true,
			},
			{
				source: "/docs/infrastructure/plugins/dash.md",
				destination: "/docs/infrastructure/plugins/dashboard.md",
				permanent: true,
			},
		];
	},
};

const withMDX = createMDX({
	contentDirBasePath: "/content/docs",
});
export default withMDX(nextConfig);
