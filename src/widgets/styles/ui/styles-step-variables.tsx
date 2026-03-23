import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { STYLES_CODE_VARIABLES } from "../model";

export async function StylesStepVariables() {
	const t = await getTranslations("styles");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("steps.variables.title")}
			</SectionTitle>
			<p className="text-muted-foreground">
				{t("steps.variables.description")}
			</p>
			<CodeBlock
				code={STYLES_CODE_VARIABLES}
				language="css"
				filename="variables.css"
			/>
		</div>
	);
}
