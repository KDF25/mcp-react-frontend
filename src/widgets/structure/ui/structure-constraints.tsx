import {
	Badge,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export function StructureConstraints() {
	const rules = RulesProvider.getRules();
	const structure = rules.structure;

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					01
				</span>
				Model Folder Constraints
			</h2>

			<Card className="border-primary/10 shadow-sm">
				<CardHeader className="flex flex-row items-center justify-between pb-4">
					<div className="space-y-1">
						<CardTitle className="text-lg">
							Structural Governance
						</CardTitle>
						<CardDescription>
							Hard limits for entity internal structure
						</CardDescription>
					</div>
					<Badge
						variant="outline"
						className="text-primary border-primary/30"
					>
						SIZE LIMIT: {structure.model.baseMaxSize}
					</Badge>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-3">
						<h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
							Required Subdirectories
						</h3>
						<div className="flex flex-wrap gap-2">
							{structure.model.subfolders.map((folder) => (
								<Badge
									key={folder}
									variant="secondary"
									className="font-mono bg-primary/5 text-primary border border-primary/10"
								>
									{folder}/
								</Badge>
							))}
						</div>
					</div>

					<div className="space-y-3">
						<h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
							Mandatory Files
						</h3>
						<div className="flex flex-wrap gap-2">
							{structure.model.requiredFiles.map((file) => (
								<Badge
									key={file}
									variant="outline"
									className="font-mono text-[11px]"
								>
									{file}
								</Badge>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
