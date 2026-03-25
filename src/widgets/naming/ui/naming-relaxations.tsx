import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { NAMING_RELAXATIONS } from "../model";

export async function NamingRelaxations() {
	const t = await getTranslations("naming");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="04" className="text-xl mb-2">
				{t("relaxations.title")}
			</SectionTitle>
			<p>{t("relaxations.description")}</p>

			<CodeBlock
				code={NAMING_RELAXATIONS}
				language="typescript"
				filename="Project Relaxations"
			/>
		</div>
	);
}
