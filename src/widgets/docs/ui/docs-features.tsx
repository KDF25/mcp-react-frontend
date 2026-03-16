import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export function DocsFeatures() {
	return (
		<div className="grid md:grid-cols-2 gap-4">
			<Card className="hover:border-primary/20 transition-colors cursor-default">
				<CardHeader className="pb-2">
					<CardTitle className="text-lg">
						Architectural Integrity
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Strict{" "}
						<Badge variant="outline" className="text-[10px] py-0">
							FSD
						</Badge>{" "}
						enforcement. Ensures modules remain decoupled and layers
						are correctly bounded.
					</p>
				</CardContent>
			</Card>
			<Card className="hover:border-primary/20 transition-colors cursor-default">
				<CardHeader className="pb-2">
					<CardTitle className="text-lg">
						Predictable Quality
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Semantic naming and strict linting. Eliminates common
						mistakes before they reach the review stage.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
