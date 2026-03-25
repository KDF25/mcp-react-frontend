import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { I18N_CODE_INFRA_KEY } from "../model";

export async function I18nStepInfraKey() {
	const t = await getTranslations("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("steps.infra_key.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t("steps.infra_key.description")}
			</div>

			<CodeBlock
				code={I18N_CODE_INFRA_KEY}
				language="typescript"
				filename="shared/config/i18n/i18n-key.ts"
			/>
		</div>
	);
}
