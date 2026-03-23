import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { MSW_CODE_HANDLERS } from "../model";

export async function MswStepHandlers() {
	const t = await getTranslations("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("steps.handlers.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.handlers.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>
			<CodeBlock
				code={MSW_CODE_HANDLERS}
				language="typescript"
				filename="entities/[entity-name]/handlers/[entity-name].handlers.ts"
			/>
		</div>
	);
}
