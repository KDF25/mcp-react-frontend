import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { API_CODE_TAGS } from "../model";

export async function RtkQueryStepTags() {
	const t = await getTranslations("rtk_query");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("steps.tags.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.tags.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<CodeBlock
				code={API_CODE_TAGS}
				language="typescript"
				filename="shared/api/backend/tags.config.ts"
			/>
		</div>
	);
}
