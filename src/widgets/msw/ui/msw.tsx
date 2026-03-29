import { getTranslations } from "next-intl/server";

import {
	Card,
	CardContent,
	CardHeader,
	ErrorBoundary,
	PageTitle
} from "@/shared/ui";

import { MswSteps } from "./msw-steps";
import { MswTree } from "./msw-tree";

export async function Msw() {
	const t = await getTranslations("msw");

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
							{t.rich("benefit_text", {
								one: (chunks) => (
									<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
										{chunks}
									</code>
								)
							})}
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
										{t.rich("naming.handlers.text", {
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
									</div>
								</li>
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("naming.mocks.label")}
									</span>
									<div className="text-muted-foreground">
										{t.rich("naming.mocks.text", {
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
									</div>
								</li>
								<li className="flex flex-col gap-1">
									<span className="font-bold text-foreground">
										{t("naming.config.label")}
									</span>
									<div className="text-muted-foreground">
										{t.rich("naming.config.text", {
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
