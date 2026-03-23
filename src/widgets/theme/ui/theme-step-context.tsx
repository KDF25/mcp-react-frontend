import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { THEME_CODE_CONTEXT } from "../model";

export async function ThemeStepContext() {
	const t = await getTranslations("theme");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("steps.context.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t("steps.context.description")}
			</div>

			<CodeBlock
				code={THEME_CODE_CONTEXT}
				language="typescript"
				filename="shared/ui/layout/theme-toggle/model/theme.context.ts"
			/>
		</div>
	);
}
