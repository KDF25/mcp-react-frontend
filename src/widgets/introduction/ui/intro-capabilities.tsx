import { getTranslations } from "next-intl/server";

import { Card, CardContent } from "@/shared/ui";

export async function IntroCapabilities() {
	const t = await getTranslations("introduction");

	const notItems = t.raw("capabilities.not_items") as string[];
	const roleSteps = t.raw("capabilities.role_steps") as Record<
		string,
		{ step: string; description: string }
	>;

	return (
		<div className="space-y-12">
			<section className="space-y-4">
				<h2 className="text-2xl font-semibold tracking-tight text-destructive">
					{t("capabilities.not_title")}
				</h2>
				<ul className="grid gap-3">
					{notItems.map((item, i) => (
						<li
							key={i}
							className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30"
						>
							<span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive font-mono text-[10px] font-bold">
								!
							</span>
							<span className="text-sm font-medium">{item}</span>
						</li>
					))}
				</ul>
			</section>

			<section className="space-y-6">
				<h2 className="text-2xl font-semibold tracking-tight">
					{t("capabilities.role_title")}
				</h2>
				<div className="relative space-y-4 pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-border">
					{Object.entries(roleSteps).map(([key, item]) => (
						<div key={key} className="relative space-y-1">
							<div className="absolute -left-7 top-1.5 h-2 w-2 rounded-full border bg-background border-primary" />
							<h3 className="font-bold text-sm tracking-tight">
								{item.step}
							</h3>
							<p className="text-sm text-muted-foreground">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-2xl font-semibold tracking-tight text-primary">
					{t("capabilities.vs_prompts_title")}
				</h2>
				<Card className="bg-primary/[0.02] border-primary/10">
					<CardContent className="pt-6">
						<p className="text-sm text-muted-foreground leading-relaxed italic text-center">
							{t("capabilities.vs_prompts_description")}
						</p>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
