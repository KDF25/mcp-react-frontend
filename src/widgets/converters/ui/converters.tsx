"use client";

import { Trans, useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	PageTitle,
	withErrorBoundary
} from "@/shared/ui";

import { ConvertersSteps } from "./converters-steps";
import { ConvertersTree } from "./converters-tree";

function ConvertersComponent() {
	const { t } = useTranslation("converters");

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
								ns="converters"
								i18nKey="benefit_text"
								components={[<code key="0" />]}
							/>
						</p>

						<ConvertersTree />

						<div className="pt-6 border-t border-border/40 space-y-4">
							<h3 className="text-lg font-semibold">
								{t("naming.title")}
							</h3>
							<ul className="space-y-3">
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("naming.converters.label")}
									</span>
									<p className="text-muted-foreground">
										<Trans
											ns="converters"
											i18nKey="naming.converters.text"
											components={[<code key="0" />]}
										/>
									</p>
								</li>
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("naming.types.label")}
									</span>
									<p className="text-muted-foreground">
										<Trans
											ns="converters"
											i18nKey="naming.types.text"
											components={[<code key="0" />]}
										/>
									</p>
								</li>
							</ul>
						</div>
					</div>

					<ConvertersSteps />
				</CardContent>
			</Card>
		</div>
	);
}

export const Converters = withErrorBoundary(ConvertersComponent);
