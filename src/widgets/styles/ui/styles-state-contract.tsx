import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export function StylesStateContract() {
	const rules = RulesProvider.getRules();
	const patterns = rules.patterns;

	const states = [
		{
			title: "Server State",
			value: patterns.stateManagement.server,
			desc: "Global async data"
		},
		{
			title: "Client State",
			value: patterns.stateManagement.client,
			desc: "Shared UI state"
		},
		{
			title: "Local State",
			value: patterns.stateManagement.local,
			desc: "Component isolated"
		}
	];

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-semibold flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					02
				</span>
				State Management Contract
			</h2>

			<div className="grid sm:grid-cols-3 gap-4">
				{states.map((item) => (
					<Card key={item.title} className="bg-muted/30 border-none">
						<CardHeader className="py-3 px-4">
							<CardTitle className="text-xs font-bold uppercase text-muted-foreground">
								{item.title}
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 pb-4 space-y-1">
							<div className="text-lg font-bold tracking-tight">
								{item.value}
							</div>
							<p className="text-[10px] text-muted-foreground">
								{item.desc}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
