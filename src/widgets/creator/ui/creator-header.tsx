"use client";

import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/shared/ui";
import { withErrorBoundary } from "@/shared/ui";

function CreatorHeaderComponent() {
	const { t } = useTranslation("creator");

	return (
		<section className="space-y-4">
			<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
				{t("header.title")}
			</h1>
			<div className="flex items-center gap-2">
				<Badge
					variant="outline"
					className="text-primary border-primary/20 bg-primary/5"
				>
					{t("header.architect")}
				</Badge>
				<Badge variant="secondary" className="flex items-center gap-1">
					<ShieldCheck size={12} /> {t("header.orchestrator")}
				</Badge>
			</div>
		</section>
	);
}

export const CreatorHeader = withErrorBoundary(CreatorHeaderComponent);
