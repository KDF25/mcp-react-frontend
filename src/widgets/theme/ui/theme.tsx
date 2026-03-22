"use client";

import { Trans, useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	PageTitle,
	withErrorBoundary
} from "@/shared/ui";

import { ThemeSteps } from "./theme-steps";
import { ThemeTree } from "./theme-tree";

function ThemeWidgetComponent() {
	const { t } = useTranslation("theme");

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
								ns="theme"
								i18nKey="benefit_text"
								components={[
									<code
										key="0"
										className="bg-primary/5 px-1 py-0.5 rounded text-primary"
									/>
								]}
							/>
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
										<Trans
											ns="theme"
											i18nKey="naming.provider.text"
											components={[
												<code
													key="0"
													className="bg-primary/5 px-1 py-0.5 rounded text-primary"
												/>
											]}
										/>
									</p>
								</li>
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("naming.shared.label")}
									</span>
									<p className="text-muted-foreground">
										<Trans
											ns="theme"
											i18nKey="naming.shared.text"
											components={[
												<code
													key="0"
													className="bg-primary/5 px-1 py-0.5 rounded text-primary"
												/>
											]}
										/>
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

export const Theme = withErrorBoundary(ThemeWidgetComponent);
