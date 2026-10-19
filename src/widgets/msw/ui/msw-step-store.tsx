import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { MSW_CODE_STORE } from "../model";

export async function MswStepStore() {
	const t = await getTranslations("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01b" className="text-xl mb-2">
				{t("steps.store.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.store.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>
			<CodeBlock
				code={MSW_CODE_STORE}
				language="typescript"
				filename="entities/[entity-name]/mock/[entity-name].store.ts"
			/>
		</div>
	);
}
