import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { I18N_CODE_INIT } from "../model";

export async function I18nStepInitCore() {
	const t = await getTranslations("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="05" className="text-xl mb-2">
				{t("steps.init_core.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.init_core.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>

			<CodeBlock
				code={I18N_CODE_INIT}
				language="typescript"
				filename="shared/config/i18n/i18n.init.ts"
			/>
		</div>
	);
}
