import { ArrowRight, Radio } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Badge, Button } from "@/shared/ui";

import { Link } from "@/i18n/routing";

export async function HomeHero() {
	const t = await getTranslations("home");
	const titleFirst = t("hero.title_first");
	const titleSecond = t("hero.title_second");

	return (
		<section className="space-y-6">
			<div className="space-y-2">
				<Badge
					variant="outline"
					className="text-primary border-primary/20 bg-primary/5 animate-pulse uppercase tracking-wider font-mono text-[10px]"
				>
					<Radio size={12} className="mr-1" />{" "}
					{t("hero.system_status")}
				</Badge>
				<h1 className="text-5xl font-black tracking-tighter lg:text-7xl">
					{titleFirst}{" "}
					<span className="text-primary italic">{titleSecond}</span>
				</h1>
				<p className="text-2xl font-medium text-muted-foreground tracking-tight">
					{t("hero.subtitle")}
				</p>
			</div>
			<p className="text-xl text-muted-foreground/80 leading-relaxed max-w-3xl">
				{t("hero.description")}
			</p>
			<div className="flex gap-4">
				<Button size="lg" className="gap-2 font-bold" asChild>
					<Link href="/introduction">
						{t("hero.cta_explore")} <ArrowRight size={18} />
					</Link>
				</Button>
				<Button
					size="lg"
					variant="outline"
					className="font-bold"
					asChild
				>
					<Link href="/creator">{t("hero.cta_architect")}</Link>
				</Button>
			</div>
		</section>
	);
}
