"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { API_CODE_AUTH_QUERY } from "../model";

function RtkQueryStepAuthQueryComponent() {
	const { t } = useTranslation("rtk_query");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.auth_query.title")}
			</SectionTitle>
			<p>
				<Trans
					ns="rtk_query"
					i18nKey="steps.auth_query.description"
					components={[<code key="0" />]}
				/>
			</p>

			<CodeBlock
				code={API_CODE_AUTH_QUERY}
				language="typescript"
				filename="entities/auth/api/auth-base-query.ts"
			/>
		</div>
	);
}

export const RtkQueryStepAuthQuery = withErrorBoundary(
	RtkQueryStepAuthQueryComponent
);
