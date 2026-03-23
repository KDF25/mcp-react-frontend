import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { MSW_CODE_MAIN } from "../model";

export async function MswStepInitMain() {
	const t = await getTranslations("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="06" className="text-xl mb-2">
				{t("steps.init_main.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.init_main.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>
			<CodeBlock
				code={MSW_CODE_MAIN}
				language="typescript"
				filename="main.tsx"
			/>
		</div>
	);
}
