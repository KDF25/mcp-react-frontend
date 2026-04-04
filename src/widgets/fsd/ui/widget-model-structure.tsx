import { getTranslations } from "next-intl/server";

import { Card, CardContent, SectionTitle } from "@/shared/ui";

import { FsdWidgetTree } from "./fsd-widget-tree";

export async function WidgetModelStructure() {
	const t = await getTranslations("fsd");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="04" className="text-xl mb-2">
				{t("steps.widgets.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.widgets.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<Card className="border-primary/10 bg-muted/30 mt-4">
				<CardContent className="p-6">
					<FsdWidgetTree />
				</CardContent>
			</Card>

			<div className="pt-6 border-t border-border/40 space-y-4">
				<h3 className="text-lg font-semibold">
					{t("steps.widgets.importance_title")}
				</h3>
				<p className="text-muted-foreground">
					{t.rich("steps.widgets.importance_description", {
						one: (chunks) => (
							<code className="bg-primary/10 px-1 py-0.5 rounded text-primary">
								{chunks}
							</code>
						)
					})}
				</p>
			</div>
		</div>
	);
}
