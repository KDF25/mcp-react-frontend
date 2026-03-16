import {
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/shared/ui";

export function DocsMission() {
	return (
		<div className="space-y-6">
			<div className="space-y-4">
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
			</div>

			<Card className="border-primary/10 shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						The Mission
					</CardTitle>
					<CardDescription>Why this server exists</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground leading-relaxed">
						This MCP server acts as an{" "}
						<strong>Automated Architect</strong>. It provides LLMs
						with a crystal-clear understanding of how to modify,
						validate, and extend this specific codebase without
						violating its core principles.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
