"use client";

import { useTranslations } from "next-intl";

import { withErrorBoundary } from "@/shared/ui";

function CreatorStatusComponent() {
	const t = useTranslations("creator");

	return (
		<div className="rounded-lg border bg-primary/5 p-4 border-primary/20 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
				<span className="text-sm font-mono text-muted-foreground">
					{t("status.label")}: {t("status.value")}
				</span>
			</div>
			<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">
				"{t("status.philosophy")}"
			</span>
		</div>
	);
}

export const CreatorStatus = withErrorBoundary(CreatorStatusComponent);
