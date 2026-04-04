import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, PageTitle } from "@/shared/ui";

import { FsdModules } from "./fsd-modules";

export async function Fsd() {
	const t = await getTranslations("fsd");

	return (
		<div className="space-y-8 max-w-4xl">
			<PageTitle
				title={t("header.title")}
				description={t.rich("header.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			/>

			<Card className="bg-muted/10">
				<CardHeader className="p-4 border-b">
					<h3 className="text-base font-bold text-primary font-mono">
						{t("card_title")}
					</h3>
				</CardHeader>
				<CardContent className="p-4 text-sm text-muted-foreground space-y-6">
					<p className="border-l-2 border-primary pl-3 italic text-foreground mb-4">
						{t.rich("benefit_text", {
							one: (chunks) => (
								<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
									{chunks}
								</code>
							)
						})}
					</p>

					<FsdModules />
				</CardContent>
			</Card>
		</div>
	);
}
