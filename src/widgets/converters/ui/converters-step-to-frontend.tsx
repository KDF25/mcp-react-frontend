"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { CONVERTERS_CODE_TO_FRONTEND } from "../model";

function ConvertersStepToFrontendComponent() {
	const { t } = useTranslation("converters");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("steps.to_frontend.title")}
			</SectionTitle>
			<p>
				<Trans
					ns="converters"
					i18nKey="steps.to_frontend.description"
					components={[<code key="0" />]}
				/>
			</p>

			<CodeBlock
				code={CONVERTERS_CODE_TO_FRONTEND}
				language="typescript"
				filename="converters/booking-order.converters.ts"
			/>
		</div>
	);
}

export const ConvertersStepToFrontend = withErrorBoundary(
	ConvertersStepToFrontendComponent
);
