import { STYLES_EXAMPLES } from "@/shared/config";
import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CodeBlock
} from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export function StylesDataFetching() {
	const rules = RulesProvider.getRules();
	const patterns = rules.patterns;

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-semibold flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					03
				</span>
				Data Fetching Implementation
			</h2>

			<Card className="border-l-4 border-l-primary">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						RTK Query Pattern
						<Badge
							variant="outline"
							className="text-[10px] uppercase border-primary/20 text-primary"
						>
							Standard
						</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-muted-foreground leading-relaxed italic">
						"{patterns.dataFetching.description}"
					</p>
					<CodeBlock
						filename="src/entities/user/api/user-api.ts"
						language="typescript"
						code={STYLES_EXAMPLES.rtkQuery}
					/>
				</CardContent>
			</Card>
		</section>
	);
}
