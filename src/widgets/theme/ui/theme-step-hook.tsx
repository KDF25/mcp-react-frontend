"use client";

import { Trans, useTranslation } from "react-i18next";

import { CodeBlock, SectionTitle, withErrorBoundary } from "@/shared/ui";

import { THEME_CODE_HOOK } from "../model";

function ThemeStepHookComponent() {
	const { t } = useTranslation("theme");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.hook.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				<Trans
					ns="theme"
					i18nKey="steps.hook.description"
					components={[
						<code
							key="0"
							className="bg-primary/5 px-1 py-0.5 rounded text-primary"
						/>
					]}
				/>
			</div>

			<CodeBlock
				code={THEME_CODE_HOOK}
				language="typescript"
				filename="shared/ui/layout/theme-toggle/model/useTheme.tsx"
			/>
		</div>
	);
}

export const ThemeStepHook = withErrorBoundary(ThemeStepHookComponent);
