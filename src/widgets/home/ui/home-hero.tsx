import { Box, Shield, Terminal } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Card, CardContent } from "@/shared/ui";

export async function HomeHero() {
	const t = await getTranslations("home");

	return (
		<div className="space-y-6 relative overflow-hidden py-2">
			<div className="flex flex-col gap-3 relative z-10">
				<div className="flex items-center gap-2 text-primary font-mono text-sm">
					<Terminal className="w-4 h-4" />
					<span>{t("hero.title")}</span>
				</div>
				<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
					{t("hero.subtitle")}
				</h1>
			</div>

			<p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl relative z-10">
				{t("hero.mission")}
			</p>

			<p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl border-l-2 border-primary/30 pl-4 relative z-10">
				{t("hero.summary")}
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border/50">
				<Card className="bg-primary/5 border-primary/20 shadow-sm hover:bg-primary/10 transition-colors">
					<CardContent className="p-4 flex items-center gap-3">
						<div className="p-2 bg-primary/10 rounded-md text-primary">
							<Terminal className="w-4 h-4" />
						</div>
						<span className="text-sm font-medium">
							{t("hero.features.control")}
						</span>
					</CardContent>
				</Card>
				<Card className="bg-primary/5 border-primary/20 shadow-sm hover:bg-primary/10 transition-colors">
					<CardContent className="p-4 flex items-center gap-3">
						<div className="p-2 bg-primary/10 rounded-md text-primary">
							<Box className="w-4 h-4" />
						</div>
						<span className="text-sm font-medium">
							{t("hero.features.structure")}
						</span>
					</CardContent>
				</Card>
				<Card className="bg-primary/5 border-primary/20 shadow-sm hover:bg-primary/10 transition-colors">
					<CardContent className="p-4 flex items-center gap-3">
						<div className="p-2 bg-primary/10 rounded-md text-primary">
							<Shield className="w-4 h-4" />
						</div>
						<span className="text-sm font-medium">
							{t("hero.features.validation")}
						</span>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
