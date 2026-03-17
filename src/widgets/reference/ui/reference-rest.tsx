"use client";

import { useTranslation } from "react-i18next";

import { Badge, Card, CardContent } from "@/shared/ui";

export function ReferenceRest() {
	const { t } = useTranslation("reference");
	const apis = [
		{
			method: "GET",
			path: "/api/mcp",
			desc: t("rest.endpoints.mcp"),
			variant: "default"
		},
		{
			method: "POST",
			path: "/api/check-project",
			desc: t("rest.endpoints.check_project"),
			variant: "outline"
		}
	];

	return (
		<section className="space-y-6 pb-12">
			<h2 className="text-2xl font-semibold">{t("rest.title")}</h2>
			<div className="grid gap-3">
				{apis.map((api) => (
					<Card
						key={api.path}
						className="border-none bg-muted/20 shadow-none hover:bg-muted/40 transition-all cursor-default group"
					>
						<CardContent className="p-4 flex items-center justify-between">
							<div className="flex items-center gap-4">
								<Badge
									variant={api.variant as any}
									className="font-black italic text-[9px]"
								>
									{api.method}
								</Badge>
								<div className="space-y-0.5">
									<div className="font-mono text-sm font-bold tracking-tight group-hover:text-primary transition-colors">
										{api.path}
									</div>
									<p className="text-[10px] text-muted-foreground">
										{api.desc}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
