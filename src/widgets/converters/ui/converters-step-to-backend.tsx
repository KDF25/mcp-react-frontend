"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { CONVERTERS_CODE_TO_BACKEND } from "../model";

function ConvertersStepToBackendComponent() {
	const { t } = useTranslation("converters");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("steps.to_backend.title")}
			</SectionTitle>
			<p>
				<Trans
					ns="converters"
					i18nKey="steps.to_backend.description"
					components={[<code key="0" />]}
				/>
			</p>

			<CodeBlock
				code={CONVERTERS_CODE_TO_BACKEND}
				language="typescript"
				filename="converters/booking-order.converters.ts"
			/>
		</div>
	);
}

export const ConvertersStepToBackend = withErrorBoundary(
	ConvertersStepToBackendComponent
);
