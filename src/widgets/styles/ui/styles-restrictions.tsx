import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export function StylesRestrictions() {
	const rules = RulesProvider.getRules();
	const styles = rules.styles;

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					01
				</span>
				Tailwind Restrictions
			</h2>

			<Card className="border-destructive/10">
				<CardHeader className="pb-4">
					<CardTitle className="text-lg">
						Forbidden Palettes
					</CardTitle>
					<CardDescription className="text-destructive/80 font-bold uppercase text-[10px] tracking-widest">
						🚨 Absolute Restriction
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
						{styles.forbiddenColors.map((color) => (
							<div
								key={color}
								className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-border grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed group"
							>
								<div className="w-4 h-4 rounded-sm bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
								<span className="text-xs font-mono uppercase tracking-tighter group-hover:text-destructive">
									{color}
								</span>
							</div>
						))}
					</div>
					<div className="p-3 rounded-md bg-destructive/5 border border-destructive/10 text-[11px] text-destructive/80 leading-tight italic">
						LLM will automatically substitute forbidden colors with
						project-approved semantic tokens (e.g. primary,
						secondary, muted).
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
