"use client";

import { useTranslation } from "react-i18next";

import { Badge, Card, CardContent } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export function LayerHierarchy() {
	const { t } = useTranslation("fsd");
	const fsd = RulesProvider.getFsdRules();

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					01
				</span>
				{t("hierarchy.title")}
			</h2>
			<Card className="bg-muted/30 border-dashed">
				<CardContent className="pt-6">
					<div className="flex flex-col gap-3">
						{fsd.layers.map((layer, index) => (
							<div
								key={layer}
								className="flex items-center gap-4"
							>
								<div className="w-28 flex justify-center">
									<Badge
										variant={
											index === 0
												? "default"
												: "secondary"
										}
										className="w-full justify-center font-mono py-1"
									>
										{layer}
									</Badge>
								</div>
								<div className="flex-1 h-[1px] bg-border" />
								{index < fsd.layers.length - 1 && (
									<div className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap px-4 bg-background">
										{t("hierarchy.can_use")} ↓
									</div>
								)}
								{index === fsd.layers.length - 1 && (
									<div className="text-[10px] font-bold text-primary uppercase whitespace-nowrap px-4 bg-background">
										{t("hierarchy.foundation")}
									</div>
								)}
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
