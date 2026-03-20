"use client";

import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

function DocsPolicyComponent() {
	const { t } = useTranslation("docs");

	return (
		<div className="rounded-lg border bg-primary/5 p-6 border-primary/20">
			<h3 className="text-lg font-bold mb-2">{t("policy.title")}</h3>
			<p className="text-sm text-muted-foreground leading-relaxed">
				{t("policy.description")}
			</p>
		</div>
	);
}

export const DocsPolicy = withErrorBoundary(DocsPolicyComponent);
