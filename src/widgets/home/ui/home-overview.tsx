import { Layers, Server, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function HomeOverview() {
	const t = await getTranslations("home");

	const ICONS = [Server, ShieldCheck, Layers];

	return (
		<section id="mcp-overview" className="space-y-4 pt-6 scroll-m-20">
			<div className="flex items-center gap-3">
				<Server className="w-6 h-6 text-primary" />
				<h2 className="text-3xl font-bold tracking-tight">
					{t("overview.title")}
				</h2>
			</div>

			<div className="flex flex-col gap-4">
				{t.raw("overview.cards").map((card: any, index: number) => {
					const Icon = ICONS[index] || Server;

					return (
						<div
							key={index}
							className="flex items-start gap-4 p-5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all"
						>
							<div className="p-2.5 bg-primary/10 rounded-lg shrink-0">
								<Icon className="w-5 h-5 text-primary" />
							</div>
							<div className="space-y-1 mt-0.5">
								<h3 className="font-semibold text-base">
									{card.title}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{card.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
