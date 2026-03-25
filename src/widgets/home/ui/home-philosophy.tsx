import { FileText, Lock, Settings, Target } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function HomePhilosophy() {
	const t = await getTranslations("home");

	const ICONS = [Target, FileText, Settings, Lock];

	return (
		<section className="space-y-4 pt-6 pb-8 border-t border-border/50 mt-6">
			<h2 className="text-3xl font-bold tracking-tight text-center">
				{t("philosophy.title")}
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto pt-4">
				{t.raw("philosophy.items").map((item: any, index: number) => {
					const Icon = ICONS[index] || Target;

					return (
						<div
							key={index}
							className="flex items-start gap-4 p-5 rounded-xl border bg-card shadow-sm hover:shadow-md transition-all"
						>
							<div className="p-2.5 bg-muted rounded-lg shrink-0">
								<Icon className="w-5 h-5 text-foreground" />
							</div>
							<div className="space-y-1 mt-0.5">
								<h3 className="font-semibold text-base">
									{item.title}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{item.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
