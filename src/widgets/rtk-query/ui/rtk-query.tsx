import { getTranslations } from "next-intl/server";

import {
	Card,
	CardContent,
	CardHeader,
	ErrorBoundary,
	PageTitle
} from "@/shared/ui";

import { RtkQuerySteps } from "./rtk-query-steps";
import { RtkQueryTree } from "./rtk-query-tree";

export async function RtkQuery() {
	const t = await getTranslations("rtk_query");

	return (
		<div className="space-y-8 max-w-4xl">
			<PageTitle title={t("title")} description={t("description")} />
			<Card className="bg-muted/10">
				<CardHeader className="p-4 border-b">
					<h3 className="text-base font-bold text-primary font-mono">
						{t("card_title")}
					</h3>
				</CardHeader>
				<CardContent className="p-4 text-sm text-muted-foreground space-y-6">
					<div className="space-y-4">
						<p className="border-l-2 border-primary pl-3 italic text-foreground mb-4">
							<strong>{t("invariant_label")}</strong>{" "}
							{t.rich("invariant_text", {
								one: (chunks) => (
									<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
										{chunks}
									</code>
								)
							})}
						</p>

						<RtkQueryTree />
					</div>

					<RtkQuerySteps />
				</CardContent>
			</Card>
		</div>
	);
}
