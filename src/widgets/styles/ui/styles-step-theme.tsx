"use client";

import { useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { STYLES_CODE_CONFIG, STYLES_CODE_THEME } from "../model";

function StylesStepThemeComponent() {
	const { t } = useTranslation("styles");

	return (
		<div className="space-y-6 pt-4 border-t border-border/40">
			<div className="space-y-4">
				<SectionTitle badge="02" className="text-xl mb-2">
					{t("steps.theme.title")}
				</SectionTitle>
				<p className="text-muted-foreground">
					{t("steps.theme.description")}
				</p>
				<CodeBlock
					code={STYLES_CODE_THEME}
					language="css"
					filename="theme.css"
				/>
			</div>
			<div className="space-y-4">
				<CodeBlock
					code={STYLES_CODE_CONFIG}
					language="typescript"
					filename="tailwind.config.ts"
				/>
			</div>
		</div>
	);
}

export const StylesStepTheme = withErrorBoundary(StylesStepThemeComponent);
