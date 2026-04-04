import { getTranslations } from "next-intl/server";

import { Badge, Card, CardContent, SectionTitle } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export async function LayerHierarchy() {
	const t = await getTranslations("fsd");
	const fsd = RulesProvider.getFsdRules();

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("steps.hierarchy.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.hierarchy.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>
			<Card className="bg-muted/30 border-dashed mt-4">
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
										{t("steps.hierarchy.can_use")} ↓
									</div>
								)}
								{index === fsd.layers.length - 1 && (
									<div className="text-[10px] font-bold text-primary uppercase whitespace-nowrap px-4 bg-background">
										{t("steps.hierarchy.foundation")}
									</div>
								)}
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
