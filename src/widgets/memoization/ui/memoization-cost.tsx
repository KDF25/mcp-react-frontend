import { ActivityIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Card, CardContent } from "@/shared/ui";

export async function MemoizationCost() {
	const t = await getTranslations("memoization");

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<ActivityIcon className="size-6 text-orange-500" />
				<h2 className="text-2xl font-bold tracking-tight">
					{t("cost.title")}
				</h2>
			</div>

			<Card className="border-orange-500/20 bg-orange-500/[0.01]">
				<CardContent className="pt-6 space-y-4">
					<p className="text-muted-foreground leading-relaxed">
						{t("cost.description")}
					</p>
					<div className="p-4 rounded-lg bg-orange-500/5 text-orange-600 font-bold text-center uppercase tracking-wider text-sm border border-orange-500/10">
						{t("cost.conclusion")}
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
