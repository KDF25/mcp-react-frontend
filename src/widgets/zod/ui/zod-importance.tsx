"use client";

import { useTranslation } from "react-i18next";

export function ZodImportance() {
	const { t } = useTranslation("zod");
	const items = t("importance.items", {
		returnObjects: true,
		defaultValue: []
	}) as Array<{
		title: string;
		description: string;
	}>;

	return (
		<section className="bg-primary/5 p-6 rounded-xl border border-primary/10">
			<h3 className="font-bold text-lg mb-4">{t("importance.title")}</h3>
			<ul className="list-disc list-inside space-y-3 text-sm text-muted-foreground">
				{items.map((item, i) => (
					<li key={i}>
						<strong className="text-foreground">
							{item.title}:
						</strong>{" "}
						{item.description}
					</li>
				))}
			</ul>
		</section>
	);
}
