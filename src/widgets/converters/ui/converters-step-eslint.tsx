import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { CONVERTERS_CODE_ESLINT } from "../model";

export async function ConvertersStepEslint() {
	const t = await getTranslations("converters");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="05" className="text-xl mb-2">
				{t("steps.eslint.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.eslint.description", {
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
			</div>
			<CodeBlock
				code={CONVERTERS_CODE_ESLINT}
				language="javascript"
				filename="eslint.config.js (converters isolation)"
			/>
		</div>
	);
}
