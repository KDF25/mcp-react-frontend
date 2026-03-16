import { Card, CardContent } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export function StructureConverters() {
	const rules = RulesProvider.getRules();
	const structure = rules.structure;

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-semibold flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					03
				</span>
				System Converters
			</h2>
			<Card className="border-primary/5 bg-primary/5">
				<CardContent className="p-6 flex items-center justify-between">
					<div className="space-y-1">
						<h3 className="font-bold">
							Naming Pattern Enforcement
						</h3>
						<p className="text-xs text-muted-foreground tracking-tight">
							All data mappers/converters must include this
							specific suffix.
						</p>
					</div>
					<div className="text-xl font-black font-mono text-primary/80 tracking-tighter border-b-2 border-primary/20">
						{structure.converters.suffix}
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
