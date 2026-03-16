import { REFERENCE_EXAMPLES } from "@/shared/config";
import {
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CodeBlock
} from "@/shared/ui";

export function ReferenceClaude() {
	const claudeConfig = REFERENCE_EXAMPLES.claudeConfig;

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-semibold flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					CL
				</span>
				Claude Desktop Connection
			</h2>
			<Card className="bg-muted/30 border-dashed">
				<CardHeader>
					<CardTitle className="text-sm">
						Local Synchronization Guide
					</CardTitle>
					<CardDescription>
						Step-by-step connection for model orchestration
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<h3 className="text-[11px] font-bold uppercase text-muted-foreground">
							1. Config Location (Windows)
						</h3>
						<Badge
							variant="secondary"
							className="font-mono text-[10px] w-full py-1 justify-start overflow-x-auto whitespace-pre"
						>
							%APPDATA%\\Claude\\claude_desktop_config.json
						</Badge>
					</div>

					<div className="space-y-3">
						<h3 className="text-[11px] font-bold uppercase text-muted-foreground">
							2. Configuration Snippet
						</h3>
						<CodeBlock
							filename="claude_desktop_config.json"
							language="json"
							code={JSON.stringify(claudeConfig, null, 2)}
						/>
						<p className="text-[10px] text-muted-foreground italic">
							Note: Restart Claude Desktop after saving the
							configuration.
						</p>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
