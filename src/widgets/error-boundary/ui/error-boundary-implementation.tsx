import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { ERROR_BOUNDARY_IMPLEMENTATION } from "../model";

export async function ErrorBoundaryImplementation() {
	const t = await getTranslations("error_boundary");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("steps.implementation.title")}
			</SectionTitle>
			<p>{t("steps.implementation.description")}</p>
			<CodeBlock
				code={ERROR_BOUNDARY_IMPLEMENTATION}
				language="tsx"
				filename="shared/ui/error-boundary/error-boundary.tsx"
			/>
		</div>
	);
}
