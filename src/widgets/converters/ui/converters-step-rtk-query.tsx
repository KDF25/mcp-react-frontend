import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { CONVERTERS_CODE_RTK_QUERY } from "../model";

export async function ConvertersStepRtkQuery() {
	const t = await getTranslations("converters");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="04" className="text-xl mb-2">
				{t("steps.rtk_query.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.rtk_query.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					),
					two: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<CodeBlock
				code={CONVERTERS_CODE_RTK_QUERY}
				language="typescript"
				filename="api/[entity-name].service.ts"
			/>
		</div>
	);
}
