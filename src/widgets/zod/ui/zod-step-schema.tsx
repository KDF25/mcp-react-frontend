import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { ZOD_SCHEMA_CODE } from "../model";

export async function ZodStepSchema() {
	const t = await getTranslations("zod");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("steps.schema.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.schema.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<CodeBlock
				code={ZOD_SCHEMA_CODE}
				language="typescript"
				filename="entities/entity-name/schema/entity-name.schema.ts"
			/>
		</div>
	);
}
