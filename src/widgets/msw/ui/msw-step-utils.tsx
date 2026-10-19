import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { MSW_CODE_UTILS } from "../model";

export async function MswStepUtils() {
	const t = await getTranslations("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("steps.utils.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.utils.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>
			<CodeBlock
				code={MSW_CODE_UTILS}
				language="typescript"
				filename="shared/api/msw/utils.ts"
			/>
		</div>
	);
}
