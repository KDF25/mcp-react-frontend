"use client";

import { useTranslation } from "react-i18next";

import { NAMING_EXAMPLES } from "@/shared/config";
import { CodeBlock, withErrorBoundary } from "@/shared/ui";

function NamingSyntaxGuidanceComponent() {
	const { t } = useTranslation("naming");

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-semibold flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					#
				</span>
				{t("syntax.title")}
			</h2>

			<CodeBlock
				filename={t("syntax.filename")}
				language="typescript"
				code={NAMING_EXAMPLES.syntaxGuidance}
			/>
		</section>
	);
}

export const NamingSyntaxGuidance = withErrorBoundary(
	NamingSyntaxGuidanceComponent
);
