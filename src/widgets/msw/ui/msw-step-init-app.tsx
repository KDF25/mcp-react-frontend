import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { MSW_CODE_INIT } from "../model";

export async function MswStepInitApp() {
	const t = await getTranslations("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="05" className="text-xl mb-2">
				{t("steps.init_app.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.init_app.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>
			<CodeBlock
				code={MSW_CODE_INIT}
				language="typescript"
				filename="app/init/msw.ts"
			/>
		</div>
	);
}
