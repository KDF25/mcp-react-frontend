"use client";

import { Trans, useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	PageTitle,
	withErrorBoundary
} from "@/shared/ui";

import { RtkQuerySteps } from "./rtk-query-steps";
import { RtkQueryTree } from "./rtk-query-tree";

function RtkQueryComponent() {
	const { t } = useTranslation("rtk_query");

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
						<p className="border-l-2 border-primary pl-3 italic text-foreground mt-4 mb-2">
							<strong>{t("invariant_label")}</strong>{" "}
							<Trans
								ns="rtk_query"
								i18nKey="invariant_text"
								components={[<code key="0" />]}
							/>
						</p>

						<RtkQueryTree />
					</div>

					<RtkQuerySteps />
				</CardContent>
			</Card>
		</div>
	);
}

export const RtkQuery = withErrorBoundary(RtkQueryComponent);
