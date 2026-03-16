import { INTRODUCTION_EXAMPLES } from "@/shared/config";
import { Badge, Separator } from "@/shared/ui";

import { IntroCapabilities } from "./intro-capabilities";
import { IntroPhilosophy } from "./intro-philosophy";

export function Introduction() {
	return (
		<div className="space-y-12">
			<section className="space-y-4">
				<div className="flex items-center gap-2">
					<Badge
						variant="outline"
						className="text-primary border-primary/20 bg-primary/5"
					>
						Orchestrator v1
					</Badge>
					<Badge variant="secondary">Architectural Hub</Badge>
				</div>
				<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
					The <span className="text-primary italic">Mission</span>
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					Establishing a definitive source of truth for architectural
					contracts, eliminating entropy, and enforcing strict project
					orchestration.
				</p>
				<div className="space-y-2 pt-4">
					<h2 className="text-2xl font-semibold tracking-tight">
						What is MCP
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed">
						{INTRODUCTION_EXAMPLES.whatIsMCP}
					</p>
				</div>
			</section>

			<Separator />
			<IntroCapabilities />
			<Separator />
			<IntroPhilosophy />
		</div>
	);
}
