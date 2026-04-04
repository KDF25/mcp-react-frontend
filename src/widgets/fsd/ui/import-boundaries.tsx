import { getTranslations } from "next-intl/server";

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	SectionTitle
} from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export async function ImportBoundaries() {
	const t = await getTranslations("fsd");
	const fsd = RulesProvider.getFsdRules();

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("steps.boundaries.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.boundaries.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>
			<div className="grid gap-4 sm:grid-cols-2 mt-4">
				{fsd.boundaries.map((boundary) => (
					<Card
						key={boundary.from}
						className="bg-card/40 hover:bg-card/60 transition-colors"
					>
						<CardHeader className="py-4">
							<CardTitle className="text-sm font-mono flex items-center gap-2">
								<Badge
									variant="outline"
									className="text-primary border-primary/20"
								>
									{boundary.from}
								</Badge>
								<span className="text-xs text-muted-foreground">
									{t("steps.boundaries.accesses")}:
								</span>
							</CardTitle>
						</CardHeader>
						<CardContent className="pb-4 pt-0">
							<div className="flex flex-wrap gap-1.5">
								{boundary.allow.map((target) => (
									<Badge
										key={target}
										variant="secondary"
										className="text-[10px] font-mono px-1.5 py-0"
									>
										{target}
									</Badge>
								))}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
