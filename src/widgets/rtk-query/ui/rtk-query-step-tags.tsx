"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { API_CODE_TAGS } from "../model";

function RtkQueryStepTagsComponent() {
	const { t } = useTranslation("rtk_query");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("steps.tags.title")}
			</SectionTitle>
			<p>
				<Trans
					ns="rtk_query"
					i18nKey="steps.tags.description"
					components={[<code key="0" />]}
				/>
			</p>

			<CodeBlock
				code={API_CODE_TAGS}
				language="typescript"
				filename="shared/api/backend/tags.config.ts"
			/>
		</div>
	);
}

export const RtkQueryStepTags = withErrorBoundary(RtkQueryStepTagsComponent);
