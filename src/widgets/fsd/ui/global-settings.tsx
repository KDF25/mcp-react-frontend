"use client";

import { useTranslations } from "next-intl";

import { Badge, withErrorBoundary } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

function GlobalSettingsComponent() {
	const t = useTranslations("fsd");
	const fsd = RulesProvider.getFsdRules();

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 font-mono">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					06
				</span>
				{t("settings.title")}
			</h2>
			<div className="grid sm:grid-cols-2 gap-3">
				{Object.entries(fsd.rules).map(([rule, active]) => (
					<div
						key={rule}
						className="flex items-center justify-between p-3 rounded-xl border bg-card/10 border-primary/10"
					>
						<span className="font-mono text-xs text-muted-foreground">
							{rule}
						</span>
						<Badge
							variant={active ? "default" : "destructive"}
							className="text-[9px] h-4 uppercase"
						>
							{active
								? t("settings.status_enforced")
								: t("settings.status_off")}
						</Badge>
					</div>
				))}
			</div>
		</section>
	);
}

export const GlobalSettings = withErrorBoundary(GlobalSettingsComponent);
