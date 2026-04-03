import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, PageTitle } from "@/shared/ui";

import { EntitiesModules } from "./entities-modules";
import { EntitiesTree } from "./entities-tree";

export async function Entities() {
	const t = await getTranslations("entities");

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
							{t.rich("benefit_text", {
								one: (chunks) => (
									<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
										{chunks}
									</code>
								)
							})}
						</p>

						<EntitiesTree />

						<div className="pt-6 border-t border-border/40 space-y-4">
							<h3 className="text-lg font-semibold">
								{t("modules_title")}
							</h3>
							<p className="text-muted-foreground">
								{t("modules_description")}
							</p>
						</div>
					</div>

					<EntitiesModules />
				</CardContent>
			</Card>
		</div>
	);
}
