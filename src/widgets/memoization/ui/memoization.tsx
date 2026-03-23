import { getTranslations } from "next-intl/server";

import { Separator } from "@/shared/ui";

import { MemoizationAntipatterns } from "./memoization-antipatterns";
import { MemoizationCost } from "./memoization-cost";
import { MemoizationIntro } from "./memoization-intro";
import { MemoizationScenarios } from "./memoization-scenarios";
import { MemoizationTools } from "./memoization-tools";

export async function Memoization() {
	const t = await getTranslations("memoization");

	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
					{t("header.title")}
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					{t("header.description")}
				</p>
			</div>

			<MemoizationIntro />
			<Separator />
			<MemoizationTools />
			<Separator />
			<MemoizationScenarios />
			<Separator />
			<MemoizationAntipatterns />
			<Separator />
			<MemoizationCost />
		</div>
	);
}
