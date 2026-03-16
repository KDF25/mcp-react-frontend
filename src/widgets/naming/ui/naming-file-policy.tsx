import { Badge, Card, CardContent, CardHeader } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export function NamingFilePolicy() {
	const naming = RulesProvider.getNamingRules();

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					Aa
				</span>
				File Case & Prefixes
			</h2>

			<div className="grid gap-6">
				<Card className="bg-card">
					<CardHeader className="pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
						Global File Policy
					</CardHeader>
					<CardContent className="flex items-center gap-4">
						<Badge
							variant="outline"
							className="text-lg font-mono py-1 px-4 border-primary/30 text-primary bg-primary/5"
						>
							{naming.fileCase}
						</Badge>
						<div className="flex flex-col">
							<span className="text-xs text-muted-foreground">
								Example:
							</span>
							<code className="text-sm font-bold">
								user-profile-card.tsx
							</code>
						</div>
					</CardContent>
				</Card>

				<div className="grid sm:grid-cols-3 gap-4">
					{Object.entries(naming.prefixes).map(([type, prefix]) => (
						<Card
							key={type}
							className="bg-muted/30 border-none shadow-none"
						>
							<CardHeader className="py-3">
								<span className="text-[10px] font-bold uppercase text-muted-foreground">
									{type} prefix
								</span>
							</CardHeader>
							<CardContent className="pb-4 pt-0">
								<div className="text-2xl font-bold font-mono text-primary/80">
									{prefix}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
