"use client";

import { useTranslation } from "react-i18next";

export function CreatorResponsibility() {
	const { t } = useTranslation("creator");
	const items = t("responsibility.items", {
		returnObjects: true,
		defaultValue: []
	}) as string[];

	return (
		<section className="space-y-4">
			<h2 className="text-2xl font-semibold tracking-tight">
				{t("responsibility.title")}
			</h2>
			<ul className="grid gap-3">
				{items.map((item, i) => (
					<li
						key={i}
						className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30"
					>
						<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-[10px] font-bold">
							{i + 1}
						</span>
						<span className="text-sm font-medium">{item}</span>
					</li>
				))}
			</ul>
		</section>
	);
}
