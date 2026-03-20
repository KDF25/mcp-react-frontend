"use client";

import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { withErrorBoundary } from "@/shared/ui";

function CreatorPrinciplesComponent() {
	const { t } = useTranslation("creator");
	const items = t("principles.items", {
		returnObjects: true,
		defaultValue: []
	}) as Array<{
		title: string;
		description: string;
	}>;

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-semibold tracking-tight">
				{t("principles.title")}
			</h2>
			<div className="grid sm:grid-cols-2 gap-4">
				{items.map((item, i) => (
					<Card
						key={i}
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

export const CreatorPrinciples = withErrorBoundary(CreatorPrinciplesComponent);
