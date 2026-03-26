import { getTranslations } from "next-intl/server";

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	SectionTitle
} from "@/shared/ui";

import { REFERENCE_TOOLS_CONFIG } from "../model";

export async function ReferenceStepTools() {
	const t = await getTranslations("reference");

	return (
		<section className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="02" className="text-xl mb-2">
				{t("tools.title")}
			</SectionTitle>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{REFERENCE_TOOLS_CONFIG.map((tool) => (
					<Card
						key={tool.key}
						className="flex flex-col border-primary/10 hover:border-primary/30 transition-all"
					>
						<CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
							<CardTitle className="text-sm font-mono font-bold text-primary">
								{tool.key}
							</CardTitle>
							<Badge variant="secondary" className="text-[10px]">
								{t(tool.badge)}
							</Badge>
						</CardHeader>
						<CardContent className="p-4 pt-0 flex-1">
							<p className="text-xs text-muted-foreground">
								{t(tool.description)}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
