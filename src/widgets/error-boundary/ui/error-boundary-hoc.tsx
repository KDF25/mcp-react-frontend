import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { ERROR_BOUNDARY_HOC_IMPLEMENTATION } from "../model";

export async function ErrorBoundaryHoc() {
	const t = await getTranslations("error_boundary");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("steps.hoc.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.hoc.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>
			<CodeBlock
				code={ERROR_BOUNDARY_HOC_IMPLEMENTATION}
				language="tsx"
				filename="shared/ui/error-boundary/with-error-boundary.tsx"
			/>
		</div>
	);
}
