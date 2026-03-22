"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { API_CODE_INJECT } from "../model";

function RtkQueryStepInjectComponent() {
	const { t } = useTranslation("rtk_query");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="05" className="text-xl mb-2">
				{t("steps.inject.title")}
			</SectionTitle>
			<p>
				<Trans
					ns="rtk_query"
					i18nKey="steps.inject.description"
					components={[<code key="0" />]}
				/>
			</p>

			<CodeBlock
				code={API_CODE_INJECT}
				language="typescript"
				filename="entities/booking/order/api/booking-order.service.ts"
			/>
		</div>
	);
}

export const RtkQueryStepInject = withErrorBoundary(
	RtkQueryStepInjectComponent
);
