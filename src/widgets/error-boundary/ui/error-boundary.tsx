import { getTranslations } from "next-intl/server";

import { Card, CardContent, CardHeader, PageTitle } from "@/shared/ui";

import { ErrorBoundaryGuidelines } from "./error-boundary-guidelines";
import { ErrorBoundaryTree } from "./error-boundary-tree";

export async function ErrorBoundary() {
	const t = await getTranslations("error_boundary");

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

						<ErrorBoundaryTree />

						<div className="pt-6 border-t border-border/40 space-y-4">
							<h3 className="text-lg font-semibold">
								{t("when_to_use.title")}
							</h3>
							<ul className="space-y-3">
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("when_to_use.isolation.label")}
									</span>
									<p className="text-muted-foreground">
										{t.rich("when_to_use.isolation.text", {
											one: (chunks) => (
												<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
													{chunks}
												</code>
											)
										})}
									</p>
								</li>
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("when_to_use.boundaries.label")}
									</span>
									<p className="text-muted-foreground">
										{t.rich("when_to_use.boundaries.text", {
											one: (chunks) => (
												<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
													{chunks}
												</code>
											),
											two: (chunks) => (
												<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
													{chunks}
												</code>
											)
										})}
									</p>
								</li>
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("when_to_use.dynamic.label")}
									</span>
									<p className="text-muted-foreground">
										{t("when_to_use.dynamic.text")}
									</p>
								</li>
							</ul>
						</div>
					</div>

					<ErrorBoundaryGuidelines />
				</CardContent>
			</Card>
		</div>
	);
}
