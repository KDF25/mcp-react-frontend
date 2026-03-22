"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { I18N_CODE_CONFIG_HUB } from "../model";

function I18nStepConfigHubComponent() {
	const { t } = useTranslation("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.config_hub.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="i18n"
					i18nKey="steps.config_hub.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>

			<CodeBlock
				code={I18N_CODE_CONFIG_HUB}
				language="typescript"
				filename="shared/config/i18n/i18n.config.ts"
			/>
		</div>
	);
}

export const I18nStepConfigHub = withErrorBoundary(I18nStepConfigHubComponent);
