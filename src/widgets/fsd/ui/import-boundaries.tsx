"use client";

import { useTranslations } from "next-intl";

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	withErrorBoundary
} from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

function ImportBoundariesComponent() {
	const t = useTranslations("fsd");
	const fsd = RulesProvider.getFsdRules();

	return (
		<section id="boundaries">
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					02
				</span>
				{t("boundaries.title")}
			</h2>
			<div className="grid gap-4 sm:grid-cols-2">
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
									{t("boundaries.accesses")}:
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
		</section>
	);
}

export const ImportBoundaries = withErrorBoundary(ImportBoundariesComponent);
