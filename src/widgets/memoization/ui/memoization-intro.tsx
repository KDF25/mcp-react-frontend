"use client";

import { InfoIcon, TargetIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

function MemoizationIntroComponent() {
	const { t } = useTranslation("memoization");

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3 text-primary">
				<InfoIcon className="size-6" />
				<h2 className="text-2xl font-bold tracking-tight">
					{t("intro.title")}
				</h2>
			</div>
			<div className="grid gap-6 md:grid-cols-2">
				<div className="p-6 rounded-xl border bg-card text-card-foreground">
					<p className="text-lg leading-relaxed">
						{t("intro.description")}
					</p>
				</div>
				<div className="p-6 rounded-xl border bg-primary/5 border-primary/20 flex gap-4">
					<TargetIcon className="size-6 text-primary shrink-0" />
					<p className="italic text-primary/80">{t("intro.goal")}</p>
				</div>
			</div>
		</section>
	);
}

export const MemoizationIntro = withErrorBoundary(MemoizationIntroComponent);
