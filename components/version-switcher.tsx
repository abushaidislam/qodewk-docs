"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { useDocsVersions, useVersionAvailability } from "@/app/docs/provider";
import type { DocsVersion } from "@/lib/docs-versions";
import {
	getVersionFromPathname,
	getVersionTargetHref,
} from "@/lib/docs-versions";
import { cn } from "@/lib/utils";

function useDismissablePopover(
	open: boolean,
	setOpen: Dispatch<SetStateAction<boolean>>,
	containerRef: RefObject<HTMLDivElement | null>,
) {
	useEffect(() => {
		if (!open) return;

		function onPointerDown(event: MouseEvent) {
			const target = event.target;
			if (
				containerRef.current &&
				target instanceof Node &&
				!containerRef.current.contains(target)
			) {
				setOpen(false);
			}
		}

		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") setOpen(false);
		}

		document.addEventListener("mousedown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("mousedown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [containerRef, open, setOpen]);
}

export function VersionSwitcher({ className }: { className?: string }) {
	const docsVersions = useDocsVersions();
	const pathname = usePathname() || "/docs";
	const router = useRouter();
	const versionAvailability = useVersionAvailability();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const currentVersion = getVersionFromPathname(pathname);
	useDismissablePopover(open, setOpen, containerRef);

	function handleSelect(version: DocsVersion) {
		setOpen(false);
		if (version.id === currentVersion.id) return;

		router.push(
			getVersionTargetHref(
				pathname,
				currentVersion,
				version,
				versionAvailability,
			),
		);
	}

	return (
		<div ref={containerRef} className={cn("relative w-full", className)}>
			<button
				type="button"
				aria-expanded={open}
				aria-controls="version-switcher-options"
				aria-label={`Documentation version: ${currentVersion.label}`}
				onClick={() => setOpen((v) => !v)}
				className="flex w-full items-center justify-between px-4 py-2.5 hover:bg-foreground/[0.03] transition-colors text-left group cursor-pointer select-none"
			>
				<div className="flex flex-col">
					<span className="text-[13px] font-semibold text-foreground tracking-tight">
						{currentVersion.id === "latest" ? "Latest Version" : `Version ${currentVersion.id}`}
					</span>
					<span className="text-[11px] text-muted-foreground font-mono">
						{currentVersion.releaseLine}
					</span>
				</div>
				<div className="flex items-center text-muted-foreground/60 group-hover:text-foreground transition-colors">
					<svg
						className="size-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m7 15 5 5 5-5" />
						<path d="m7 9 5-5 5 5" />
					</svg>
				</div>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -4 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -4 }}
						transition={{ duration: 0.12, ease: "easeOut" }}
						className="absolute top-full left-3 right-3 z-50 border border-foreground/[0.08] bg-background shadow-2xl shadow-black/20 dark:shadow-black/60 py-1.5 rounded-lg"
						id="version-switcher-options"
					>
						{docsVersions.map((version) => {
							const isActive = version.id === currentVersion.id;
							return (
								<button
									key={version.id}
									type="button"
									aria-pressed={isActive}
									onClick={() => handleSelect(version)}
									className={cn(
										"flex w-full items-center justify-between px-3 py-2 text-left hover:bg-foreground/[0.06] transition-colors cursor-pointer",
										isActive && "bg-foreground/[0.04]"
									)}
								>
									<div className="flex flex-col">
										<span className="text-xs font-medium text-foreground">
											{version.id === "latest" ? "Latest Version" : `Version ${version.id}`}
										</span>
										<span className="text-[10px] text-muted-foreground font-mono">
											{version.releaseVersion || (version.id === "latest" ? "0.2.3" : "0.2.0")}
										</span>
									</div>
									{isActive && (
										<Check className="h-3.5 w-3.5 text-foreground" />
									)}
								</button>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export function MobileVersionSwitcher() {
	return <VersionSwitcher className="w-full" />;
}

export function SidebarVersionSwitcher() {
	return (
		<div className="border-b border-foreground/5">
			<VersionSwitcher />
		</div>
	);
}
