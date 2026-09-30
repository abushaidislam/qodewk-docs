import { useId } from "react";

interface FeatureItem {
	title: string;
	description: string;
}

export function Features({ features }: { features?: FeatureItem[] }) {
	const items = features ?? grid;
	return (
		<div className="py-2 max-w-[1300px] not-prose">
			<div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto">
				{items.map((feature, i) => (
					<div
						key={feature.title}
						className="relative bg-gradient-to-b min-h-[180px] dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white px-6 py-6 overflow-hidden flex flex-col justify-start border border-neutral-200/60 dark:border-neutral-800/80 rounded-sm"
					>
						<Grid size={i * 5 + 10} pattern={patterns[i % patterns.length]} />
						<p className="text-base font-bold text-neutral-800 dark:text-white relative z-0 mb-2 leading-snug">
							{feature.title}
						</p>
						<p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-normal relative z-0 leading-relaxed">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

const grid: FeatureItem[] = [
	{
		title: "Multi-Platform Harvesting",
		description:
			"Direct footprint harvesting for Google Antigravity, Claude Code, Cursor, Copilot, and Aider",
	},
	{
		title: "AI vs. Human Attribution",
		description:
			"Cross-reference Git diff hunks against agent tool calls to calculate exact code contribution",
	},
	{
		title: "Dual-Engine Provenance",
		description:
			"High-confidence verified telemetry from local session transcripts with heuristic AST fallback",
	},
	{
		title: "Frontier Cost Estimation",
		description:
			"Built-in dynamic rate cards with cache read/write pricing for Claude, Gemini, OpenAI, and DeepSeek",
	},
	{
		title: "Thermal Receipt Generator",
		description:
			"Verifiable monospace ASCII thermal receipts, shareable web links, and machine-readable JSON",
	},
	{
		title: "Zero Source Exfiltration",
		description:
			"Strict privacy invariant: source code never leaves your machine. Metadata and hashes only",
	},
	{
		title: "Automated PR Sticky Receipts",
		description:
			"Official GitHub Action to post verifiable proof-of-shipment comment receipts on Pull Requests",
	},
	{
		title: "Git-Native Local Store",
		description:
			"Embedded zero-native SQLite state persistence with non-blocking background Git hooks",
	},
	{
		title: "Time-Bounded Analytics",
		description:
			"Filter and audit shipments across customizable windows like --today, --since 24h, or specific dates",
	},
];

const patterns: number[][][] = [
	[
		[7, 1],
		[8, 3],
		[9, 2],
		[10, 4],
		[8, 5],
	],
	[
		[8, 2],
		[7, 4],
		[9, 1],
		[10, 3],
		[7, 5],
	],
	[
		[9, 3],
		[8, 1],
		[7, 4],
		[10, 2],
		[9, 5],
	],
	[
		[7, 2],
		[9, 4],
		[8, 3],
		[10, 1],
		[8, 5],
	],
	[
		[8, 4],
		[10, 2],
		[7, 3],
		[9, 1],
		[7, 5],
	],
	[
		[10, 3],
		[7, 1],
		[8, 4],
		[9, 2],
		[10, 5],
	],
	[
		[7, 3],
		[8, 2],
		[10, 4],
		[9, 1],
		[8, 5],
	],
	[
		[9, 2],
		[7, 5],
		[8, 1],
		[10, 3],
		[9, 4],
	],
	[
		[8, 1],
		[10, 4],
		[7, 2],
		[9, 3],
		[7, 4],
	],
];

export const Grid = ({
	pattern,
	size,
}: {
	pattern?: number[][];
	size?: number;
}) => {
	const p = pattern ?? [
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
	];
	return (
		<div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
			<div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
				<GridPattern
					width={size ?? 20}
					height={size ?? 20}
					x="-12"
					y="4"
					squares={p}
					className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
				/>
			</div>
		</div>
	);
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
	const patternId = useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern
					id={patternId}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect
				width="100%"
				height="100%"
				strokeWidth={0}
				fill={`url(#${patternId})`}
			/>
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y]: any, idx: number) => (
						<rect
							strokeWidth="0"
							key={`${x}-${y}-${idx}`}
							width={width + 1}
							height={height + 1}
							x={x * width}
							y={y * height}
						/>
					))}
				</svg>
			)}
		</svg>
	);
}
