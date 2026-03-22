"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { I18N_CODE_SWITCHING } from "../model";

function I18nStepSwitchingComponent() {
	const { t } = useTranslation("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="08" className="text-xl mb-2">
				{t("steps.switching.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="i18n"
					i18nKey="steps.switching.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>

			<CodeBlock
				code={I18N_CODE_SWITCHING}
				language="typescript"
				filename="shared/config/i18n/change-language.ts"
			/>
		</div>
	);
}

export const I18nStepSwitching = withErrorBoundary(I18nStepSwitchingComponent);
