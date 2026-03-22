"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { API_CODE_BASE } from "../model";

function RtkQueryStepBaseComponent() {
	const { t } = useTranslation("rtk_query");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("steps.base.title")}
			</SectionTitle>
			<p>
				<Trans
					ns="rtk_query"
					i18nKey="steps.base.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</p>

			<CodeBlock
				code={API_CODE_BASE}
				language="typescript"
				filename="shared/api/backend/base.api.ts"
			/>
		</div>
	);
}

export const RtkQueryStepBase = withErrorBoundary(RtkQueryStepBaseComponent);
