"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { I18N_CODE_INIT } from "../model";

function I18nStepInitCoreComponent() {
	const { t } = useTranslation("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="05" className="text-xl mb-2">
				{t("steps.init_core.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="i18n"
					i18nKey="steps.init_core.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>

			<CodeBlock
				code={I18N_CODE_INIT}
				language="typescript"
				filename="shared/config/i18n/i18n.init.ts"
			/>
		</div>
	);
}

export const I18nStepInitCore = withErrorBoundary(I18nStepInitCoreComponent);
