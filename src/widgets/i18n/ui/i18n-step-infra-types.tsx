"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { I18N_CODE_INFRA_TYPES } from "../model";

function I18nStepInfraTypesComponent() {
	const { t } = useTranslation("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("steps.infra_types.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="i18n"
					i18nKey="steps.infra_types.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>

			<CodeBlock
				code={I18N_CODE_INFRA_TYPES}
				language="typescript"
				filename="shared/config/i18n/i18n.types.ts"
			/>
		</div>
	);
}

export const I18nStepInfraTypes = withErrorBoundary(
	I18nStepInfraTypesComponent
);
