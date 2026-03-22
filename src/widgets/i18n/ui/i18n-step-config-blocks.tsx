"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { I18N_CODE_CONFIG_BLOCKS } from "../model";

function I18nStepConfigBlocksComponent() {
	const { t } = useTranslation("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="04" className="text-xl mb-2">
				{t("steps.config_blocks.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="i18n"
					i18nKey="steps.config_blocks.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>

			<CodeBlock
				code={I18N_CODE_CONFIG_BLOCKS}
				language="typescript"
				filename="shared/config/i18n/i18n.blocks.ts"
			/>
		</div>
	);
}

export const I18nStepConfigBlocks = withErrorBoundary(
	I18nStepConfigBlocksComponent
);
