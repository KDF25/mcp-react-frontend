import { Bot, Code2, Layers, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Badge, PageTitle } from "@/shared/ui";

export async function CreatorHero() {
	const t = await getTranslations("creator");

	return (
		<div className="space-y-6">
			<PageTitle title={t("header.title")} />
			<div className="flex flex-col gap-3 pt-2 text-foreground">
				<h2 className="text-3xl font-bold tracking-tight">
					{t("hero.name")}
				</h2>
				<p className="text-xl font-medium text-primary">
					{t.rich("hero.role", {
						one: (chunks) => (
							<code className="bg-primary/10 px-1 py-0.5 rounded border border-primary/20 text-primary font-bold">
								{chunks}
							</code>
						),
						two: (chunks) => (
							<code className="bg-primary/10 px-1 py-0.5 rounded border border-primary/20 text-primary font-bold">
								{chunks}
							</code>
						),
						three: (chunks) => (
							<code className="bg-primary/10 px-1 py-0.5 rounded border border-primary/20 text-primary font-bold">
								{chunks}
							</code>
						),
						four: (chunks) => (
							<code className="bg-primary/10 px-1 py-0.5 rounded border border-primary/20 text-primary font-bold">
								{chunks}
							</code>
						)
					})}
				</p>
				<div className="text-muted-foreground whitespace-pre-wrap leading-relaxed max-w-4xl text-[15px]">
					{t("hero.subtitle")}
				</div>
			</div>
			<div className="flex flex-wrap gap-2 pt-2">
				<Badge variant="default" className="text-sm px-3 py-1">
					<Layers className="w-4 h-4 mr-2" /> {t("badges.fsd")}
				</Badge>
				<Badge variant="secondary" className="text-sm px-3 py-1">
					<Code2 className="w-4 h-4 mr-2" /> {t("badges.react")}
				</Badge>
				<Badge
					variant="outline"
					className="text-sm px-3 py-1 border-primary/20 bg-primary/5 text-primary"
				>
					<Zap className="w-4 h-4 mr-2" /> {t("badges.realtime")}
				</Badge>
				<Badge
					variant="secondary"
					className="text-sm px-3 py-1 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20"
				>
					<Bot className="w-4 h-4 mr-2" /> {t("badges.ai")}
				</Badge>
			</div>
		</div>
	);
}
