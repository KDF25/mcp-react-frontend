import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { NAMING_TYPING_CONVENTIONS } from "../model";

export async function NamingTypingConventions() {
	const t = await getTranslations("naming");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("naming_conventions.typing.label")}
			</SectionTitle>
			<p>
				{t.rich("naming_conventions.typing.text", {
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
					),
					four: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<CodeBlock
				code={NAMING_TYPING_CONVENTIONS}
				language="typescript"
				filename="Typing Conventions"
			/>
		</div>
	);
}
