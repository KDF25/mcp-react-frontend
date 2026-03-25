import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { ERROR_BOUNDARY_HOC_USAGE } from "../model";

export async function ErrorBoundaryProhibitions() {
	const t = await getTranslations("error_boundary");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.usage.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.usage.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					),
					two: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>
			<CodeBlock
				code={ERROR_BOUNDARY_HOC_USAGE}
				language="tsx"
				filename="HOC Usage Example"
			/>
		</div>
	);
}
