import { ReferenceClaude } from "./reference-claude";
import { ReferenceRest } from "./reference-rest";
import { ReferenceTools } from "./reference-tools";

export function Reference() {
	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					API Reference & Connection
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					Technical specifications for tool integration and local
					environment synchronization.
				</p>
			</div>
			<div className="space-y-12">
				<ReferenceTools />
				<ReferenceClaude />
				<ReferenceRest />
			</div>
		</div>
	);
}
