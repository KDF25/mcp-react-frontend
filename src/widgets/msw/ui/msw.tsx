"use client";

import { Trans, useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	PageTitle,
	withErrorBoundary
} from "@/shared/ui";

import { MswSteps } from "./msw-steps";
import { MswTree } from "./msw-tree";

function MswComponent() {
	const { t } = useTranslation("msw");

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
							<strong>{t("benefit_label")}</strong>{" "}
							<Trans
								ns="msw"
								i18nKey="benefit_text"
								components={[
									<code
										key="0"
										className="bg-primary/5 px-1 py-0.5 rounded text-primary"
									/>
								]}
							/>
						</p>

						<MswTree />

						<div className="pt-6 border-t border-border/40 space-y-4">
							<h3 className="text-lg font-semibold">
								{t("naming.title")}
							</h3>
							<ul className="space-y-3">
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("naming.handlers.label")}
									</span>
									<div className="text-muted-foreground">
										<Trans
											ns="msw"
											i18nKey="naming.handlers.text"
											components={[
												<code
													key="0"
													className="bg-primary/5 px-1 py-0.5 rounded text-primary"
												/>
											]}
										/>
									</div>
								</li>
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("naming.mocks.label")}
									</span>
									<div className="text-muted-foreground">
										<Trans
											ns="msw"
											i18nKey="naming.mocks.text"
											components={[
												<code
													key="0"
													className="bg-primary/5 px-1 py-0.5 rounded text-primary"
												/>
											]}
										/>
									</div>
								</li>
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("naming.config.label")}
									</span>
									<div className="text-muted-foreground">
										<Trans
											ns="msw"
											i18nKey="naming.config.text"
											components={[
												<code
													key="0"
													className="bg-primary/5 px-1 py-0.5 rounded text-primary"
												/>
											]}
										/>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<MswSteps />
				</CardContent>
			</Card>
		</div>
	);
}

export const Msw = withErrorBoundary(MswComponent);
