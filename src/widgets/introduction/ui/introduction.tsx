import { getTranslations } from "next-intl/server";

import { Badge, Separator } from "@/shared/ui";

import { IntroCapabilities } from "./intro-capabilities";
import { IntroPhilosophy } from "./intro-philosophy";

export async function Introduction() {
	const t = await getTranslations("introduction");

	return (
		<div className="space-y-12">
			<section className="space-y-4">
				<div className="flex items-center gap-2">
					<Badge
						variant="outline"
						className="text-primary border-primary/20 bg-primary/5"
					>
						{t("hero.version")}
					</Badge>
					<Badge variant="secondary">{t("hero.hub")}</Badge>
				</div>
				<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
					The{" "}
					<span className="text-primary italic">
						{t("hero.mission_title")}
					</span>
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					{t("hero.mission_description")}
				</p>
				<div className="space-y-2 pt-4">
					<h2 className="text-2xl font-semibold tracking-tight">
						{t("hero.what_is_mcp")}
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed">
						{t("hero.mcp_definition")}
					</p>
				</div>
			</section>

			<Separator />
			<IntroCapabilities />
			<Separator />
			<IntroPhilosophy />
		</div>
	);
}
