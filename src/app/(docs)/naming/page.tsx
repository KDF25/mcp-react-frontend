import { NAMING_EXAMPLES } from "@/shared/config";
import { Badge, Card, CardContent, CardHeader, CodeBlock } from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

export default function NamingPage() {
	const naming = RulesProvider.getNamingRules();
	const linter = RulesProvider.getLinterRules();

	return (
		<>
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					Naming & Style Standards
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					Строгие семантические соглашения, предназначенные для
					устранения двусмысленности и технического долга через
					статический анализ.
				</p>
			</div>

			<div className="space-y-12">
				<section>
					<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
						<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
							Aa
						</span>
						File Case & Prefixes
					</h2>

					<div className="grid gap-6">
						<Card className="bg-card">
							<CardHeader className="pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
								Global File Policy
							</CardHeader>
							<CardContent className="flex items-center gap-4">
								<Badge
									variant="outline"
									className="text-lg font-mono py-1 px-4 border-primary/30 text-primary bg-primary/5"
								>
									{naming.fileCase}
								</Badge>
								<div className="flex flex-col">
									<span className="text-xs text-muted-foreground">
										Example:
									</span>
									<code className="text-sm font-bold">
										user-profile-card.tsx
									</code>
								</div>
							</CardContent>
						</Card>

						<div className="grid sm:grid-cols-3 gap-4">
							{Object.entries(naming.prefixes).map(
								([type, prefix]) => (
									<Card
										key={type}
										className="bg-muted/30 border-none shadow-none"
									>
										<CardHeader className="py-3">
											<span className="text-[10px] font-bold uppercase text-muted-foreground">
												{type} prefix
											</span>
										</CardHeader>
										<CardContent className="pb-4 pt-0">
											<div className="text-2xl font-bold font-mono text-primary/80">
												{prefix}
											</div>
										</CardContent>
									</Card>
								)
							)}
						</div>
					</div>
				</section>

				<section id="linter">
					<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-destructive">
						<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive font-mono text-sm font-bold">
							!
						</span>
						Linter Prohibitions
					</h2>
					<div className="grid gap-3">
						{Object.entries(linter).map(([rule, active]) => (
							<Card
								key={rule}
								className="border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors"
							>
								<CardContent className="p-4 flex items-center justify-between">
									<div className="space-y-1">
										<div className="font-mono text-sm font-bold text-destructive/80">
											{rule}
										</div>
										<p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
											Static Block Enforcement
										</p>
									</div>
									<Badge
										variant="destructive"
										className="animate-pulse h-5 text-[9px]"
									>
										Strict Prohibited
									</Badge>
								</CardContent>
							</Card>
						))}
					</div>
				</section>

				<section className="space-y-6">
					<h2 className="text-2xl font-semibold flex items-center gap-3">
						<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
							#
						</span>
						Syntax Guidance
					</h2>

					<CodeBlock
						filename="Code Syntax Guidelines"
						language="typescript"
						code={NAMING_EXAMPLES.syntaxGuidance}
					/>
				</section>
			</div>
		</>
	);
}
