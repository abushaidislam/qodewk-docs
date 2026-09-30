import React from "react";

export function HalftoneBackground({ className = "" }: { className?: string }) {
	return (
		<div
			className={`absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-foreground/[0.04] to-transparent ${className}`}
			aria-hidden="true"
		/>
	);
}
