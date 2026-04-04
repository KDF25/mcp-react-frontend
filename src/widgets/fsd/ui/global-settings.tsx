import { getTranslations } from "next-intl/server";

import { Badge, SectionTitle } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export async function GlobalSettings() {
	const t = await getTranslations("fsd");
	const fsd = RulesProvider.getFsdRules();

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="06" className="text-xl mb-2">
				{t("steps.settings.title")}
			</SectionTitle>
			<div className="grid sm:grid-cols-2 gap-3 mt-2">
				{Object.entries(fsd.rules).map(([rule, active]) => (
					<div
						key={rule}
						className="flex items-center justify-between p-3 rounded-xl border bg-card/10 border-primary/10"
					>
						<span className="font-mono text-xs text-muted-foreground">
							{t(`steps.settings.${rule}`)}
						</span>
						<Badge
							variant={active ? "default" : "destructive"}
							className="text-[9px] h-4 uppercase"
						>
							{active
								? t("steps.settings.status_enforced")
								: t("steps.settings.status_off")}
						</Badge>
					</div>
				))}
			</div>
		</div>
	);
}
