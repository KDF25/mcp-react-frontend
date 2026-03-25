import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, PageTitle } from "@/shared/ui";

import { NamingSteps } from "./naming-steps";
import { NamingTree } from "./naming-tree";

export async function Naming() {
	const t = await getTranslations("naming");

	return (
		<div className="space-y-8 max-w-4xl">
			<PageTitle
				title={t("header.title")}
				description={t("header.description")}
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
							{t("benefit_text")}
						</p>

						<NamingTree />
					</div>

					<NamingSteps />
				</CardContent>
			</Card>
		</div>
	);
}
