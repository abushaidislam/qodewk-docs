"use client";

import { useBreadcrumb } from "fumadocs-core/breadcrumb";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTree } from "@/app/docs/provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { setMobileNavigationView } from "@/lib/mobile-navigation";
import { cn } from "@/lib/utils";

export function DocsHeader() {
	const pathname = usePathname() || "/docs";
	const tree = usePageTree();
	const { setOpenSearch } = useSearchContext();
	const breadcrumbs = useBreadcrumb(pathname, tree, {
		includePage: true,
	});

	return (
		<header className="fixed top-0 right-0 left-0 lg:left-[min(22vw,300px)] z-20 flex h-[52px] items-center justify-between border-b border-foreground/5 bg-background/85 px-4 backdrop-blur-md transition-[left] duration-300 ease-out select-none lg:px-8">
			{/* Left: Mobile Brand & Desktop Breadcrumbs */}
			<div className="flex items-center gap-2.5 min-w-0">
				{/* Mobile: Hamburger & Logo */}
				<div className="flex items-center gap-2.5 lg:hidden">
					<button
						type="button"
						onClick={() => setMobileNavigationView("docs")}
						aria-label="Open documentation navigation"
						className="flex size-7 items-center justify-center rounded-md border border-foreground/10 text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
					>
						<Menu className="size-4" />
					</button>

					<Link
						href="/docs/getting-started/introduction"
						className="flex items-center gap-2"
					>
						<div className="flex h-5 w-5 items-center justify-center rounded bg-[#cc785c] text-white font-mono text-[11px] font-black tracking-tighter">
							Q
						</div>
						<span className="font-mono text-sm font-bold tracking-wider text-foreground">
							QODEWK.
						</span>
					</Link>
				</div>

				{/* Desktop: Dynamic Breadcrumbs */}
				<nav
					aria-label="Breadcrumbs"
					className="hidden lg:flex items-center gap-1.5 text-xs text-foreground/50"
				>
					<Link
						href="/docs/getting-started/introduction"
						className="transition-colors hover:text-foreground/80 font-mono"
					>
						Docs
					</Link>

					{breadcrumbs.length > 0 && (
						<ChevronRight className="size-3.5 shrink-0 opacity-40" />
					)}

					{breadcrumbs.map((item, index) => {
						const isLast = index === breadcrumbs.length - 1;
						return (
							<div
								key={typeof item.name === "string" ? item.name : index}
								className="flex items-center gap-1.5 min-w-0"
							>
								{item.url && !isLast ? (
									<Link
										href={item.url}
										className="truncate transition-colors hover:text-foreground/80"
									>
										{item.name}
									</Link>
								) : (
									<span
										className={cn(
											"truncate",
											isLast
												? "font-medium text-foreground"
												: "text-foreground/50",
										)}
									>
										{item.name}
									</span>
								)}
								{!isLast && (
									<ChevronRight className="size-3.5 shrink-0 opacity-40" />
								)}
							</div>
						);
					})}
				</nav>
			</div>

			{/* Right: Search, GitHub & Theme Toggle */}
			<div className="flex items-center gap-2 shrink-0">
				{/* Search Trigger */}
				<button
					type="button"
					onClick={() => setOpenSearch(true)}
					className="flex h-7 items-center gap-2 rounded-md border border-foreground/10 bg-foreground/[0.03] px-2.5 text-xs text-foreground/60 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.06] hover:text-foreground"
				>
					<svg
						className="size-3.5 shrink-0 opacity-60"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="11" cy="11" r="5.5" />
						<path d="m15 15l4 4" />
					</svg>
					<span className="hidden sm:inline">Search</span>
					<kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-foreground/15 bg-background px-1 text-[10px] font-mono opacity-70">
						<span className="text-[11px]">&#8984;</span>K
					</kbd>
				</button>

				{/* GitHub */}
				<a
					href="https://github.com/abushaidislam/qodewk-docs"
					target="_blank"
					rel="noreferrer noopener"
					aria-label="GitHub Repository"
					className="flex size-7 items-center justify-center rounded-md border border-foreground/10 text-foreground/60 transition-colors hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground"
				>
					<svg
						className="size-3.5 fill-current"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						/>
					</svg>
				</a>

				{/* Theme Toggle */}
				<div className="flex size-7 items-center justify-center rounded-md border border-foreground/10 text-foreground/60 transition-colors hover:border-foreground/20 hover:bg-foreground/5 hover:text-foreground">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
