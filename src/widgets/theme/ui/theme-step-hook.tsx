import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { THEME_CODE_HOOK } from "../model";

export async function ThemeStepHook() {
	const t = await getTranslations("theme");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.hook.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.hook.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>

			<CodeBlock
				code={THEME_CODE_HOOK}
				language="typescript"
				filename="shared/ui/layout/theme-toggle/model/useTheme.tsx"
			/>
		</div>
	);
}
