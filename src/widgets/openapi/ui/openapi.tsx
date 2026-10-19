import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, PageTitle } from "@/shared/ui";

import { OpenapiSteps } from "./openapi-steps";

export async function Openapi() {
	const t = await getTranslations("openapi");

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
					<p className="border-l-2 border-primary pl-3 italic text-foreground mb-4">
						<strong>{t("benefit_label")}</strong>{" "}
						{t("benefit_text")}
					</p>
					<OpenapiSteps />
				</CardContent>
			</Card>
		</div>
	);
}
