"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { CONVERTERS_CODE_FILTERS } from "../model";

function ConvertersStepFiltersComponent() {
	const { t } = useTranslation("converters");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.filters.title")}
			</SectionTitle>
			<p>
				<Trans
					ns="converters"
					i18nKey="steps.filters.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</p>

			<CodeBlock
				code={CONVERTERS_CODE_FILTERS}
				language="typescript"
				filename="converters/booking-order.converters.ts"
			/>
		</div>
	);
}

export const ConvertersStepFilters = withErrorBoundary(
	ConvertersStepFiltersComponent
);
