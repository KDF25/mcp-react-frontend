"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { I18N_CODE_TRANS, I18N_CODE_USAGE } from "../model";

function I18nStepUsageComponent() {
	const { t } = useTranslation("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="07" className="text-xl mb-2">
				{t("steps.usage.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="i18n"
					i18nKey="steps.usage.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>

			<div className="space-y-4">
				<CodeBlock
					code={I18N_CODE_USAGE}
					language="typescript"
					filename="components/Example.tsx"
				/>
				<CodeBlock
					code={I18N_CODE_TRANS}
					language="typescript"
					filename="components/TransExample.tsx"
				/>
			</div>
		</div>
	);
}

export const I18nStepUsage = withErrorBoundary(I18nStepUsageComponent);
