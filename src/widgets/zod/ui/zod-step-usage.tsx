import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { ZOD_USAGE_CODE } from "../model";

export async function ZodStepUsage() {
	const t = await getTranslations("zod");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.usage.title")}
			</SectionTitle>
			<p>
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
			</p>

			<CodeBlock
				code={ZOD_USAGE_CODE}
				language="typescript"
				filename="widgets/entity-name/ui/entity-name.tsx"
			/>
		</div>
	);
}
