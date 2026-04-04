import { getTranslations } from "next-intl/server";

import { FSD_EXAMPLES } from "@/shared/config";
import { Badge, CodeBlock, SectionTitle } from "@/shared/ui";

export async function PracticalExamples() {
	const t = await getTranslations("fsd");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="05" className="text-xl mb-2">
				{t("steps.examples.title")}
			</SectionTitle>

			<div className="grid gap-6 mt-2">
				<div className="space-y-3">
					<Badge
						variant="outline"
						className="text-primary border-primary/20 gap-2 font-mono"
					>
						✅ {t("steps.examples.correct")}
					</Badge>
					<CodeBlock
						filename="src/features/auth/ui/login-form.tsx"
						language="typescript"
						code={FSD_EXAMPLES.validImport}
					/>
				</div>

				<div className="space-y-3">
					<Badge
						variant="outline"
						className="text-destructive border-destructive/20 gap-2 font-mono"
					>
						❌ {t("steps.examples.violation")}
					</Badge>
					<CodeBlock
						filename="src/entities/user/model/user.ts"
						language="typescript"
						code={FSD_EXAMPLES.forbiddenViolation}
					/>
				</div>
			</div>
		</div>
	);
}
