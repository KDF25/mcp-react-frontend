import { CheckCircle2, TerminalSquare } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Card, CardContent } from "@/shared/ui";

export async function CreatorCompetencies() {
	const t = await getTranslations("creator");

	return (
		<section className="space-y-4">
			<div className="flex items-center gap-3">
				<TerminalSquare className="w-6 h-6 text-primary" />
				<h3 className="text-2xl font-bold tracking-tight">
					{t("competencies.title")}
				</h3>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{t.raw("competencies.items").map((_: any, i: number) => {
					const codeMarkup = (chunks: React.ReactNode) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary border border-primary/10">
							{chunks}
						</code>
					);

					return (
						<Card
							key={i}
							className="bg-primary/5 border-primary/20 shadow-sm transition-colors hover:bg-primary/10"
						>
							<CardContent className="p-4 flex items-start gap-3">
								<CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
								<p className="font-medium text-[15px]">
									{t.rich(`competencies.items.${i}`, {
										one: codeMarkup,
										two: codeMarkup,
										three: codeMarkup,
										four: codeMarkup
									})}
								</p>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</section>
	);
}
