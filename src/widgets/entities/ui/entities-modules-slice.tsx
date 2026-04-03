import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { SLICE_CODE } from "../model";

export async function EntitiesModulesSlice() {
	const t = await getTranslations("entities");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="06" className="text-xl mb-2">
				{t("modules.slice.title")}
			</SectionTitle>
			<p>
				{t.rich("modules.slice.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					),
					two: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					),
					three: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<CodeBlock
				code={SLICE_CODE}
				language="typescript"
				filename="slice/[entity-name].slice.ts"
			/>
		</div>
	);
}
