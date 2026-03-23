import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

export async function MswStepEnv() {
	const t = await getTranslations("msw");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="07" className="text-xl mb-2">
				{t("steps.env.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.env.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>
			<CodeBlock
				code="VITE_ENABLE_MSW=true"
				language="bash"
				filename=".env"
			/>
		</div>
	);
}
