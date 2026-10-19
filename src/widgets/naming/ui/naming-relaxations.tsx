import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { NAMING_RELAXATIONS } from "../model";

export async function NamingRelaxations() {
	const t = await getTranslations("naming");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="06" className="text-xl mb-2">
				{t("relaxations.title")}
			</SectionTitle>
			<p>
				{t.rich("relaxations.description", {
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
				code={NAMING_RELAXATIONS}
				language="javascript"
				filename="eslint.config.js (overrides)"
			/>
		</div>
	);
}
