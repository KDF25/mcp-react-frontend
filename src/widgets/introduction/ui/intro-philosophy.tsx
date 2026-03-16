import { INTRODUCTION_EXAMPLES } from "@/shared/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export function IntroPhilosophy() {
	return (
		<section className="space-y-6">
			<div className="space-y-2">
				<h2 className="text-2xl font-semibold tracking-tight">
					Design Philosophy
				</h2>
				<p className="text-sm text-muted-foreground leading-relaxed">
					Any modification that violates the established contracts
					will be rejected by the orchestrator. We prioritize
					long-term maintainability over short-term speed.
				</p>
			</div>
			<div className="grid sm:grid-cols-2 gap-4">
				{INTRODUCTION_EXAMPLES.philosophy.map((item, i) => (
					<Card
						key={i}
						className="border-none shadow-none bg-muted/50"
					>
						<CardHeader className="p-4 pb-2">
							<CardTitle className="text-xs font-black uppercase tracking-widest text-primary/80">
								{item.title}
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<p className="text-xs text-muted-foreground leading-normal">
								{item.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
