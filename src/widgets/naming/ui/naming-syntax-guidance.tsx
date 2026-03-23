import { getTranslations } from "next-intl/server";

import { NAMING_EXAMPLES } from "@/shared/config";
import { CodeBlock } from "@/shared/ui";

export async function NamingSyntaxGuidance() {
	const t = await getTranslations("naming");

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-semibold flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					#
				</span>
				{t("syntax.title")}
			</h2>

			<CodeBlock
				filename={t("syntax.filename")}
				language="typescript"
				code={NAMING_EXAMPLES.syntaxGuidance}
			/>
		</section>
	);
}
