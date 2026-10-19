import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { NAMING_CODE_ESLINT_FILENAME } from "../model";

export async function NamingEslintFilename() {
	const t = await getTranslations("naming");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("eslint_filename.title")}
			</SectionTitle>
			<p>
				{t.rich("eslint_filename.description", {
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
				code={NAMING_CODE_ESLINT_FILENAME}
				language="javascript"
				filename="eslint.config.js (unicorn/filename-case)"
			/>
		</div>
	);
}
