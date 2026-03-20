"use client";

import { CheckCircle2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MemoizationScenarios() {
	const { t } = useTranslation("memoization");

	const items = t("scenarios.items", {
		returnObjects: true,
		defaultValue: {}
	}) as Record<string, string>;

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-bold tracking-tight">
				{t("scenarios.title")}
			</h2>
			<div className="grid md:grid-cols-3 gap-4">
				{Object.entries(items).map(([key, value]) => (
					<div
						key={key}
						className="p-4 rounded-lg border bg-primary/[0.02] border-primary/10 space-y-3"
					>
						<CheckCircle2Icon className="size-5 text-primary" />
						<p className="text-sm leading-relaxed text-foreground/80 font-medium">
							{value}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
