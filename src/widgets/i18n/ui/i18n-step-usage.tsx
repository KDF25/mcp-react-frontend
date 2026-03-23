import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { I18N_CODE_TRANS, I18N_CODE_USAGE } from "../model";

export async function I18nStepUsage() {
	const t = await getTranslations("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="07" className="text-xl mb-2">
				{t("steps.usage.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.usage.description", {
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

			<div className="space-y-4">
				<CodeBlock
					code={I18N_CODE_USAGE}
					language="typescript"
					filename="components/Example.tsx"
				/>
				<CodeBlock
					code={I18N_CODE_TRANS}
					language="typescript"
					filename="components/TransExample.tsx"
				/>
			</div>
		</div>
	);
}
