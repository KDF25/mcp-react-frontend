import { getTranslations } from "next-intl/server";

import { REFERENCE_EXAMPLES } from "@/shared/config";
import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CodeBlock
} from "@/shared/ui";

export async function ReferenceTools() {
	const t = await getTranslations("reference");

	return (
		<section id="tools" className="space-y-6">
			<h2 className="text-2xl font-semibold flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					#
				</span>
				{t("tools.title")}
			</h2>

			<div className="grid gap-4">
				<Card className="border-primary/10 hover:border-primary/30 transition-all group">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary/[0.02]">
						<CardTitle className="font-mono text-lg font-bold text-primary group-hover:text-primary transition-colors">
							analyze_project
						</CardTitle>
						<Badge
							variant="outline"
							className="text-[10px] border-primary/20 text-primary uppercase"
						>
							{t("tools.analyze_project.badge")}
						</Badge>
					</CardHeader>
					<CardContent className="pt-4 space-y-4">
						<p className="text-sm text-muted-foreground leading-relaxed">
							{t("tools.analyze_project.description")}
						</p>
						<div className="space-y-2">
							<h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
								{t("tools.analyze_project.schema_title")}
							</h4>
							<CodeBlock
								filename="Input Schema"
								language="json"
								code={REFERENCE_EXAMPLES.inputSchema}
							/>
						</div>
					</CardContent>
				</Card>

				<Card className="border-primary/10 group">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-mono text-lg font-bold text-primary group-hover:text-primary transition-colors">
							get_rules
						</CardTitle>
						<Badge
							variant="outline"
							className="text-[10px] border-primary/20 text-primary uppercase"
						>
							{t("tools.get_rules.badge")}
						</Badge>
					</CardHeader>
					<CardContent className="pt-2">
						<p className="text-sm text-muted-foreground italic">
							{t("tools.get_rules.description")}
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
