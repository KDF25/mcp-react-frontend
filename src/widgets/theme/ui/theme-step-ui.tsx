import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { THEME_CODE_UI } from "../model";

export async function ThemeStepUi() {
	const t = await getTranslations("theme");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="06" className="text-xl mb-2">
				{t("steps.ui.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.ui.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>

			<CodeBlock
				code={THEME_CODE_UI}
				language="typescript"
				filename="shared/ui/layout/theme-toggle/ui/theme-toggle.tsx"
			/>
		</div>
	);
}
