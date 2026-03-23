import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { CONVERTERS_CODE_FILTERS } from "../model";

export async function ConvertersStepFilters() {
	const t = await getTranslations("converters");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.filters.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.filters.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<CodeBlock
				code={CONVERTERS_CODE_FILTERS}
				language="typescript"
				filename="converters/booking-order.converters.ts"
			/>
		</div>
	);
}
