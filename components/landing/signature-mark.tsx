import React from "react";

export function SignatureMark({ compact = false }: { compact?: boolean }) {
	return (
		<div className="flex items-center gap-2 text-xs font-mono text-muted-foreground select-none">
			<span className="font-semibold text-foreground/80">Qodewk</span>
			{!compact && <span className="text-[10px] text-muted-foreground/60">• Docs</span>}
		</div>
	);
}
