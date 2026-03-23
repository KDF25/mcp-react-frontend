import { ShieldAlertIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Badge } from "@/shared/ui";

export async function ErrorBoundaryIntroduction() {
	const t = await getTranslations("error_boundary");

	return (
		<section className="space-y-6">
			<div className="space-y-2">
				<div className="flex items-center gap-3 text-primary">
					<ShieldAlertIcon size={24} />
					<h2 className="text-3xl font-bold tracking-tight">
						{t("header.title")}
					</h2>
				</div>
				<p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
					{t("header.description")}
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="p-6 rounded-xl border bg-card shadow-sm space-y-3">
					<h3 className="font-bold text-lg">{t("intro.title")}</h3>
					<p className="text-muted-foreground leading-relaxed">
						{t("intro.description")}
					</p>
				</div>
				<div className="p-6 rounded-xl border bg-primary/5 border-primary/10 space-y-3">
					<h3 className="font-bold text-lg text-primary">
						{t("rules.title")}
					</h3>
					<ul className="space-y-2">
						{Object.entries(
							t.raw("rules.items") as Record<string, string>
						).map(([key, value]) => (
							<li key={key} className="flex gap-2 text-sm">
								<Badge
									variant="outline"
									className="h-5 capitalize"
								>
									{key}
								</Badge>
								<span className="text-muted-foreground">
									{value}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
