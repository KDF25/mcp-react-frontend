"use client";

import { AlertTriangleIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function MemoizationAntipatterns() {
	const { t } = useTranslation("memoization");

	const items = t("antipatterns.items", {
		returnObjects: true,
		defaultValue: []
	}) as string[];

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3 text-destructive">
				<AlertTriangleIcon className="size-6" />
				<h2 className="text-2xl font-bold tracking-tight">
					{t("antipatterns.title")}
				</h2>
			</div>
			<ul className="grid gap-3">
				{items.map((item, i) => (
					<li
						key={i}
						className="flex items-start gap-3 p-4 rounded-lg border bg-destructive/5 border-destructive/10"
					>
						<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive font-bold text-xs uppercase">
							!
						</span>
						<span className="text-sm font-medium">{item}</span>
					</li>
				))}
			</ul>
		</section>
	);
}
