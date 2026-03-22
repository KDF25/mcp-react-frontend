"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { CONVERTERS_CODE_RTK_QUERY } from "../model";

function ConvertersStepRtkQueryComponent() {
	const { t } = useTranslation("converters");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="04" className="text-xl mb-2">
				{t("steps.rtk_query.title")}
			</SectionTitle>
			<p>
				<Trans
					ns="converters"
					i18nKey="steps.rtk_query.description"
					components={[<code key="0" />]}
				/>
			</p>

			<CodeBlock
				code={CONVERTERS_CODE_RTK_QUERY}
				language="typescript"
				filename="api/[entity-name].service.ts"
			/>
		</div>
	);
}

export const ConvertersStepRtkQuery = withErrorBoundary(
	ConvertersStepRtkQueryComponent
);
