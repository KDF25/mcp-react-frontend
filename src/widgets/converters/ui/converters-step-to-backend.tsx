import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { CONVERTERS_CODE_TO_BACKEND } from "../model";

export async function ConvertersStepToBackend() {
	const t = await getTranslations("converters");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("steps.to_backend.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.to_backend.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<CodeBlock
				code={CONVERTERS_CODE_TO_BACKEND}
				language="typescript"
				filename="converters/booking-order.converters.ts"
			/>
		</div>
	);
}
