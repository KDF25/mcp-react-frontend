import { Ban, CheckCircle2, Flag, Search, Workflow } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function HomeRole() {
	const t = await getTranslations("home");

	const ICONS = [Search, CheckCircle2, Ban, Flag];

	return (
		<section className="space-y-4 pt-6">
			<div className="flex items-center gap-3">
				<Workflow className="w-6 h-6 text-primary" />
				<h2 className="text-3xl font-bold tracking-tight">
					{t("role.title")}
				</h2>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{t.raw("role.items").map((item: any, index: number) => {
					const Icon = ICONS[index] || Search;

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
