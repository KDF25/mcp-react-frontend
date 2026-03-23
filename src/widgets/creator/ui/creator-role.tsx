"use client";

import { useTranslations } from "next-intl";

import { withErrorBoundary } from "@/shared/ui";

function CreatorRoleComponent() {
	const t = useTranslations("creator");

	return (
		<section className="space-y-4">
			<h2 className="text-2xl font-semibold tracking-tight">
				{t("role.title")}
			</h2>
			<p className="text-lg text-muted-foreground leading-relaxed">
				{t("role.content")}
			</p>
		</section>
	);
}

export const CreatorRole = withErrorBoundary(CreatorRoleComponent);
