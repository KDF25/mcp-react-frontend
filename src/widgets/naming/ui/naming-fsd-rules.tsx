import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { NAMING_FSD_RULES } from "../model";

export async function NamingFsdRules() {
	const t = await getTranslations("naming");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("fsd_rules.title")}
			</SectionTitle>
			<p>
				{t.rich("fsd_rules.description", {
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
				code={NAMING_FSD_RULES}
				language="text"
				filename="FSD Import Rules"
			/>
		</div>
	);
}
