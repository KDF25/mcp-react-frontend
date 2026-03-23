import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { STYLES_CODE_GLOBAL } from "../model";

export async function StylesStepGlobal() {
	const t = await getTranslations("styles");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.global.title")}
			</SectionTitle>
			<p className="text-muted-foreground">
				{t("steps.global.description")}
			</p>
			<CodeBlock
				code={STYLES_CODE_GLOBAL}
				language="css"
				filename="global.css"
			/>
		</div>
	);
}
