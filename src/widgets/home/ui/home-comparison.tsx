import { Check, MessageSquareWarning, ShieldCheck, X } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function HomeComparison() {
	const t = await getTranslations("home");

	return (
		<section className="space-y-4 pt-6">
			<h2 className="text-3xl font-bold tracking-tight text-center">
				{t("comparison.title")}
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
				{/* Prompts Side */}
				<div className="rounded-xl border border-border/50 bg-muted/20 p-6 space-y-4">
					<div className="flex items-center gap-3 pb-2 border-b border-border/50">
						<MessageSquareWarning className="w-5 h-5 text-muted-foreground" />
						<h3 className="font-semibold text-lg text-muted-foreground">
							{t("comparison.prompts.title")}
						</h3>
					</div>
					<ul className="space-y-3">
						{t
							.raw("comparison.prompts.items")
							.map((item: string, i: number) => (
								<li
									key={i}
									className="flex items-start gap-3 text-muted-foreground"
								>
									<X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
									<span className="text-sm">{item}</span>
								</li>
							))}
					</ul>
				</div>

				{/* MCP Side */}
				<div className="rounded-xl border border-primary/30 bg-primary/5 p-6 space-y-4 shadow-sm relative overflow-hidden">
					<div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-[0.03] pointer-events-none">
						<ShieldCheck className="w-32 h-32 text-primary" />
					</div>
					<div className="flex items-center gap-3 pb-2 border-b border-primary/20 relative z-10">
						<ShieldCheck className="w-5 h-5 text-primary" />
						<h3 className="font-semibold text-lg text-primary">
							{t("comparison.mcp.title")}
						</h3>
					</div>
					<ul className="space-y-3 relative z-10">
						{t
							.raw("comparison.mcp.items")
							.map((item: string, i: number) => (
								<li key={i} className="flex items-start gap-3">
									<Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
									<span className="text-sm font-medium">
										{item}
									</span>
								</li>
							))}
					</ul>
				</div>
			</div>
		</section>
	);
}
