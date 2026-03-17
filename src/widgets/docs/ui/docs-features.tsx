"use client";

import { useTranslation } from "react-i18next";

import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export function DocsFeatures() {
	const { t } = useTranslation("docs");

	return (
		<div className="grid md:grid-cols-2 gap-4">
			<Card className="hover:border-primary/20 transition-colors cursor-default">
				<CardHeader className="pb-2">
					<CardTitle className="text-lg">
						{t("features.integrity.title")}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Strict{" "}
						<Badge variant="outline" className="text-[10px] py-0">
							FSD
						</Badge>{" "}
						{t("features.integrity.desc")}
					</p>
				</CardContent>
			</Card>
			<Card className="hover:border-primary/20 transition-colors cursor-default">
				<CardHeader className="pb-2">
					<CardTitle className="text-lg">
						{t("features.quality.title")}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						{t("features.quality.desc")}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
