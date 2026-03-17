"use client";

import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HomeInfrastructure() {
	const { t } = useTranslation("home");
	const infraItems = t("infrastructure", {
		returnObjects: true,
		defaultValue: {}
	}) as Record<string, { title: string; description: string }>;

	return (
		<section className="grid md:grid-cols-3 gap-8 pt-4">
			{Object.entries(infraItems).map(([key, item]) => (
				<div key={key} className="space-y-2">
					<div className="flex items-center gap-2">
						<Zap size={16} className="text-primary/60" />
						<h3 className="font-bold tracking-tight">
							{item.title}
						</h3>
					</div>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{item.description}
					</p>
				</div>
			))}
		</section>
	);
}
