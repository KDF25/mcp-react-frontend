"use client";

import { Trans, useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	PageTitle,
	withErrorBoundary
} from "@/shared/ui";

import { StylesSteps } from "./styles-steps";
import { StylesTree } from "./styles-tree";

function StylesComponent() {
	const { t } = useTranslation("styles");

	return (
		<div className="space-y-8 max-w-4xl">
			<PageTitle description={t("description")} title={t("title")} />

			<Card className="bg-muted/10">
				<CardHeader className="p-4 border-b">
					<h3 className="text-base font-bold text-primary font-mono">
						{t("card_title")}
					</h3>
				</CardHeader>
				<CardContent className="p-4 text-sm text-muted-foreground space-y-6">
					<div className="space-y-4">
						<p className="border-l-2 border-primary pl-3 italic text-foreground mt-4 mb-2">
							<strong>{t("benefit_label")}</strong>{" "}
							<Trans
								ns="styles"
								i18nKey="benefit_text"
								components={[
									<code
										key="0"
										className="bg-primary/5 px-1 py-0.5 rounded text-primary"
									/>
								]}
							/>
						</p>

						<StylesTree />
					</div>

					<StylesSteps />
				</CardContent>
			</Card>
		</div>
	);
}

export const Styles = withErrorBoundary(StylesComponent);
