"use client";

import { useTranslation } from "react-i18next";

import { FSD_EXAMPLES } from "@/shared/config";
import { Badge, CodeBlock } from "@/shared/ui";

export function PracticalExamples() {
	const { t } = useTranslation("fsd");

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-semibold flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					05
				</span>
				{t("examples.title")}
			</h2>

			<div className="grid gap-4">
				<div className="space-y-2">
					<Badge
						variant="outline"
						className="text-primary border-primary/20 gap-2 mb-2"
					>
						✅ {t("examples.correct")}
					</Badge>
					<CodeBlock
						filename="src/features/auth/ui/login-form.tsx"
						language="typescript"
						code={FSD_EXAMPLES.validImport}
					/>
				</div>

				<div className="space-y-2">
					<Badge
						variant="outline"
						className="text-destructive border-destructive/20 gap-2 mb-2"
					>
						❌ {t("examples.violation")}
					</Badge>
					<CodeBlock
						filename="src/entities/user/model/user.ts"
						language="typescript"
						code={FSD_EXAMPLES.forbiddenViolation}
					/>
				</div>
			</div>
		</section>
	);
}
