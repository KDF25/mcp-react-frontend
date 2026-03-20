"use client";

import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

function CreatorRoleComponent() {
	const { t } = useTranslation("creator");

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
