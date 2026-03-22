"use client";

import { useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { STYLES_CODE_VARIABLES } from "../model";

function StylesStepVariablesComponent() {
	const { t } = useTranslation("styles");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("steps.variables.title")}
			</SectionTitle>
			<p className="text-muted-foreground">
				{t("steps.variables.description")}
			</p>
			<CodeBlock
				code={STYLES_CODE_VARIABLES}
				language="css"
				filename="variables.css"
			/>
		</div>
	);
}

export const StylesStepVariables = withErrorBoundary(
	StylesStepVariablesComponent
);
