import { Badge, Card, CardContent } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export function NamingLinterRules() {
	const linter = RulesProvider.getLinterRules();

	return (
		<section id="linter">
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-destructive">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive font-mono text-sm font-bold">
					!
				</span>
				Linter Prohibitions
			</h2>
			<div className="grid gap-3">
				{Object.entries(linter).map(([rule, active]) => (
					<Card
						key={rule}
						className="border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors"
					>
						<CardContent className="p-4 flex items-center justify-between">
							<div className="space-y-1">
								<div className="font-mono text-sm font-bold text-destructive/80">
									{rule}
								</div>
								<p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
									Static Block Enforcement
								</p>
							</div>
							<Badge
								variant="destructive"
								className="animate-pulse h-5 text-[9px]"
							>
								Strict Prohibited
							</Badge>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
