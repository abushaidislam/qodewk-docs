import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<footer className="w-full border-t border-foreground/[0.08] py-8 px-5 sm:px-6 lg:px-8 text-xs text-muted-foreground">
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
				<p>© {new Date().getFullYear()} Qodewk. All rights reserved.</p>
				<div className="flex items-center gap-4">
					<Link
						href="/docs/getting-started/introduction"
						className="hover:text-foreground transition-colors"
					>
						Docs
					</Link>
				</div>
			</div>
		</footer>
	);
}
