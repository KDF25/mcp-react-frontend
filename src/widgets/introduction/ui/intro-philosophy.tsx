"use client";

import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { withErrorBoundary } from "@/shared/ui";

function IntroPhilosophyComponent() {
	const { t } = useTranslation("introduction");
	const items = t("philosophy.items", {
		returnObjects: true,
		defaultValue: {}
	}) as Record<string, { title: string; description: string }>;

	return (
		<section className="space-y-6">
			<div className="space-y-2">
				<h2 className="text-2xl font-semibold tracking-tight">
					{t("philosophy.title")}
				</h2>
				<p className="text-sm text-muted-foreground leading-relaxed">
					{t("philosophy.description")}
				</p>
			</div>
			<div className="grid sm:grid-cols-2 gap-4">
				{Object.entries(items).map(([key, item]) => (
					<Card
						key={key}
						className="border-none shadow-none bg-muted/50"
					>
						<CardHeader className="p-4 pb-2">
							<CardTitle className="text-xs font-black uppercase tracking-widest text-primary/80">
								{item.title}
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<p className="text-xs text-muted-foreground leading-normal">
								{item.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}

export const IntroPhilosophy = withErrorBoundary(IntroPhilosophyComponent);
