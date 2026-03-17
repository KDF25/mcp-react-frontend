"use client";

import { useTranslation } from "react-i18next";

import { Badge, Card, CardContent, CardHeader, CodeBlock } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

import { STRUCTURE_DATA } from "../model";

export function StructureConstraints() {
	const { t } = useTranslation("structure");
	const structureRules = RulesProvider.getRules().structure;

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					01
				</span>
				{t("constraints.title")}
			</h2>

			<div className="grid gap-6">
				<div className="grid sm:grid-cols-3 gap-4">
					<Card className="bg-muted/30 border-none shadow-none">
						<CardHeader className="p-4 pb-2">
							<h3 className="text-sm font-bold text-primary">
								{t("constraints.model_title")}
							</h3>
						</CardHeader>
						<CardContent className="p-4 pt-0 space-y-2">
							<p className="text-xs text-muted-foreground">
								{t("constraints.model_description", {
									max: structureRules.model.baseMaxSize
								})}
							</p>
							<div className="flex flex-wrap gap-1">
								{structureRules.model.requiredFiles.map(
									(file) => (
										<Badge
											key={file}
											variant="outline"
											className="text-[9px]"
										>
											{file}
										</Badge>
									)
								)}
							</div>
						</CardContent>
					</Card>

					<Card className="bg-muted/30 border-none shadow-none">
						<CardHeader className="p-4 pb-2">
							<h3 className="text-sm font-bold text-primary">
								{t("constraints.folders_title")}
							</h3>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<div className="flex flex-wrap gap-1">
								{structureRules.model.subfolders.map(
									(folder) => (
										<Badge
											key={folder}
											variant="secondary"
											className="text-[9px]"
										>
											{folder}
										</Badge>
									)
								)}
							</div>
						</CardContent>
					</Card>

					<Card className="bg-muted/30 border-none shadow-none">
						<CardHeader className="p-4 pb-2">
							<h3 className="text-sm font-bold text-primary">
								{t("constraints.naming_title")}
							</h3>
						</CardHeader>
						<CardContent className="p-4 pt-0">
							<p className="text-xs text-muted-foreground font-mono">
								{structureRules.model.filePattern}
							</p>
						</CardContent>
					</Card>
				</div>

				<Card className="border-primary/10 bg-primary/5">
					<CardHeader className="pb-3 flex flex-row items-center justify-between">
						<span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
							{t("constraints.imports_label")}
						</span>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="space-y-2">
							<Badge
								variant="outline"
								className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]"
							>
								{t("constraints.imports_valid")}
							</Badge>
							<CodeBlock
								code={STRUCTURE_DATA.validImport}
								language="typescript"
								filename="import-governance.ts"
							/>
						</div>
						<div className="space-y-2">
							<Badge
								variant="outline"
								className="bg-destructive/10 text-destructive border-destructive/20 text-[10px]"
							>
								{t("constraints.imports_forbidden")}
							</Badge>
							<CodeBlock
								code={STRUCTURE_DATA.forbiddenViolation}
								language="typescript"
								filename="import-governance.ts"
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
