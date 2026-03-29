import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, PageTitle } from "@/shared/ui";

import { ThemeSteps } from "./theme-steps";
import { ThemeTree } from "./theme-tree";

export async function Theme() {
	const t = await getTranslations("theme");

	return (
		<div className="space-y-8 max-w-4xl">
			<PageTitle
				description={t("header.description")}
				title={t("header.title")}
			/>

			<Card className="bg-muted/10">
				<CardHeader className="p-4 border-b">
					<h3 className="text-base font-bold text-primary font-mono">
						{t("card_title")}
					</h3>
				</CardHeader>
				<CardContent className="p-4 text-sm text-muted-foreground space-y-6">
					<div className="space-y-4">
						<p className="border-l-2 border-primary pl-3 italic text-foreground mb-4">
							<strong>{t("benefit_label")}</strong>{" "}
							{t.rich("benefit_text", {
								one: (chunks) => (
									<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
										{chunks}
									</code>
								)
							})}
						</p>

						<ThemeTree />

						<div className="pt-6 border-t border-border/40 space-y-4">
							<h3 className="text-lg font-semibold">
								{t("naming.title")}
							</h3>
							<ul className="space-y-3">
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("naming.provider.label")}
									</span>
									<p className="text-muted-foreground">
										{t.rich("naming.provider.text", {
											one: (chunks) => (
												<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
													{chunks}
												</code>
											)
										})}
									</p>
								</li>
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("naming.shared.label")}
									</span>
									<p className="text-muted-foreground">
										{t.rich("naming.shared.text", {
											one: (chunks) => (
												<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
													{chunks}
												</code>
											)
										})}
									</p>
								</li>
							</ul>
						</div>
					</div>

					<ThemeSteps />
				</CardContent>
			</Card>
		</div>
	);
}
