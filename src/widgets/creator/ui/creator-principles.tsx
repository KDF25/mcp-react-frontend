"use client";

import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { withErrorBoundary } from "@/shared/ui";

function CreatorPrinciplesComponent() {
	const t = useTranslations("creator");
	const items = t.raw("principles.items") as Array<{
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
