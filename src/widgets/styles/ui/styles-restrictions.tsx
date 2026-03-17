"use client";

import { useTranslation } from "react-i18next";

import { Badge, Card, CardContent, CardHeader } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export function StylesRestrictions() {
	const { t } = useTranslation("styles");
	const stylesRules = RulesProvider.getRules().styles;

	return (
		<section className="space-y-8">
			<h2 className="text-2xl font-semibold flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					01
				</span>
				{t("restrictions.title")}
			</h2>

			<div className="grid gap-6">
				<Card className="bg-muted/10 border-none shadow-none">
					<CardHeader className="p-4 pb-2">
						<h3 className="text-sm font-bold text-primary">
							{t("restrictions.utility_title")}
						</h3>
					</CardHeader>
					<CardContent className="p-4 pt-0 space-y-4">
						<p className="text-xs text-muted-foreground">
							{t("restrictions.utility_description", {
								utility: stylesRules.requiredUtility
							})}
						</p>
						<div className="flex flex-wrap gap-2">
							{stylesRules.allowedUtilityPrefixes.map(
								(prefix) => (
									<Badge
										key={prefix}
										variant="secondary"
										className="text-[10px]"
									>
										{prefix}*
									</Badge>
								)
							)}
						</div>
					</CardContent>
				</Card>

				<Card className="bg-destructive/5 border-none shadow-none">
					<CardHeader className="p-4 pb-2">
						<h3 className="text-sm font-bold text-destructive">
							{t("restrictions.colors_title")}
						</h3>
					</CardHeader>
					<CardContent className="p-4 pt-0 space-y-3">
						<p className="text-xs text-muted-foreground">
							{t("restrictions.colors_description")}
						</p>
						<div className="flex flex-wrap gap-1">
							{stylesRules.forbiddenColors.map((color) => (
								<Badge
									key={color}
									variant="outline"
									className="text-[9px] border-destructive/20 text-destructive/70"
								>
									{color}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
