"use client";

import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, withErrorBoundary } from "@/shared/ui";

function ZodArchitectureComponent() {
	const { t } = useTranslation("zod");
	const items = t("architecture.items", {
		returnObjects: true,
		defaultValue: []
	}) as Array<{
		title: string;
		description: string;
	}>;

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					01
				</span>
				{t("architecture.title")}
			</h2>

			<div className="grid sm:grid-cols-3 gap-6">
				{items.map((item, i) => (
					<Card
						key={i}
						className="bg-muted/10 border-none shadow-none"
					>
						<CardHeader className="p-4 pb-2">
							<h3 className="text-sm font-bold text-primary">
								{item.title}
							</h3>
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

export const ZodArchitecture = withErrorBoundary(ZodArchitectureComponent);
