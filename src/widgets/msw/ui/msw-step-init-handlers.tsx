import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { MSW_CODE_HANDLERS_REGISTRY } from "../model";

export async function MswStepInitHandlers() {
	const t = await getTranslations("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="04" className="text-xl mb-2">
				{t("steps.init_handlers.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.init_handlers.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>
			<CodeBlock
				code={MSW_CODE_HANDLERS_REGISTRY}
				language="typescript"
				filename="shared/api/msw/handlers.ts"
			/>
		</div>
	);
}
