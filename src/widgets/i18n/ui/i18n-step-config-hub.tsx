import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { I18N_CODE_CONFIG_HUB, I18N_CODE_CONFIG_HUB_NEXT } from "../model";

export async function I18nStepConfigHub() {
	const t = await getTranslations("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.config_hub.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.config_hub.description", {
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
			</div>

			<div className="space-y-4">
				<CodeBlock
					code={I18N_CODE_CONFIG_HUB}
					language="typescript"
					filename="Vite — public/locales → i18n.config.ts"
				/>
				<CodeBlock
					code={I18N_CODE_CONFIG_HUB_NEXT}
					language="typescript"
					filename="Next.js — messages/ → i18n.config.ts"
				/>
			</div>
		</div>
	);
}
