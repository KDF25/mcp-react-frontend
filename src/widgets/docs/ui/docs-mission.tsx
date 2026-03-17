"use client";

import { useTranslation } from "react-i18next";

import {
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/shared/ui";

export function DocsMission() {
	const { t } = useTranslation("docs");

	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<Badge
						variant="outline"
						className="text-primary border-primary/20 bg-primary/5"
					>
						{t("mission.badges.orchestrator")}
					</Badge>
					<Badge variant="secondary">{t("mission.badges.hub")}</Badge>
				</div>
				<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
					<span className="text-primary italic">
						{t("mission.title")}
					</span>
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					{t("mission.description")}
				</p>
			</div>

			<Card className="border-primary/10 shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						{t("mission.card.title")}
					</CardTitle>
					<CardDescription>
						{t("mission.card.subtitle")}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground leading-relaxed">
						{t("mission.card.description")}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
