"use client";

import { useTranslation } from "react-i18next";

import { Badge, CodeBlock, withErrorBoundary } from "@/shared/ui";

import { ZOD_DATA } from "../model";

function ZodPatternComponent() {
	const { t } = useTranslation("zod");

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					02
				</span>
				{t("pattern.title")}
			</h2>
			<div className="grid gap-6">
				<div className="space-y-4">
					<p className="text-muted-foreground">
						{t("pattern.description")}
					</p>
					<div className="space-y-2">
						<Badge variant="secondary">Schema Definition</Badge>
						<CodeBlock
							filename="schema/account.schema.ts"
							language="typescript"
							code={ZOD_DATA.inputSchema}
						/>
					</div>
				</div>
				<div className="space-y-2">
					<Badge variant="secondary">Integration</Badge>
					<CodeBlock
						filename="mcp-config.json"
						language="json"
						code={JSON.stringify(ZOD_DATA.claudeConfig, null, 2)}
					/>
				</div>
			</div>
		</section>
	);
}

export const ZodPattern = withErrorBoundary(ZodPatternComponent);
