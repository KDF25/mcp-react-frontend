"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { API_CODE_AUTH_API } from "../model";

function RtkQueryStepAuthApiComponent() {
	const { t } = useTranslation("rtk_query");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="04" className="text-xl mb-2">
				{t("steps.auth_api.title")}
			</SectionTitle>
			<p>
				<Trans
					ns="rtk_query"
					i18nKey="steps.auth_api.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</p>

			<CodeBlock
				code={API_CODE_AUTH_API}
				language="typescript"
				filename="entities/auth/api/auth.api.ts"
			/>
		</div>
	);
}

export const RtkQueryStepAuthApi = withErrorBoundary(
	RtkQueryStepAuthApiComponent
);
