"use client";

import { useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { STYLES_CODE_GLOBAL } from "../model";

function StylesStepGlobalComponent() {
	const { t } = useTranslation("styles");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.global.title")}
			</SectionTitle>
			<p className="text-muted-foreground">
				{t("steps.global.description")}
			</p>
			<CodeBlock
				code={STYLES_CODE_GLOBAL}
				language="css"
				filename="global.css"
			/>
		</div>
	);
}

export const StylesStepGlobal = withErrorBoundary(StylesStepGlobalComponent);
