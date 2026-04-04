import { getTranslations } from "next-intl/server";

import { Card, CardContent, SectionTitle } from "@/shared/ui";

import { FsdEntityTree } from "./fsd-entity-tree";

export async function EntityStructure() {
	const t = await getTranslations("fsd");
	const entityItems = t.raw("steps.entities.items") as Record<string, string>;

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.entities.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.entities.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<Card className="border-primary/10 bg-muted/30 mt-4">
				<CardContent className="p-6">
					<FsdEntityTree />
				</CardContent>
			</Card>

			<div className="pt-6 border-t border-border/40 space-y-4">
				<h3 className="text-lg font-semibold">
					{t("steps.entities.title_modules")}
				</h3>
				<div className="grid gap-x-8 gap-y-4 md:grid-cols-2 mt-4">
					<ul className="space-y-3 text-sm text-muted-foreground">
						<li className="flex gap-2 items-start">
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary text-[11px] font-mono shrink-0">
								api/:
							</code>{" "}
							<span>{entityItems.api}</span>
						</li>
						<li className="flex gap-2 items-start">
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary text-[11px] font-mono shrink-0">
								converters/:
							</code>{" "}
							<span>{entityItems.converters}</span>
						</li>
						<li className="flex gap-2 items-start">
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary text-[11px] font-mono shrink-0">
								handlers/:
							</code>{" "}
							<span>{entityItems.handlers}</span>
						</li>
						<li className="flex gap-2 items-start">
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary text-[11px] font-mono shrink-0">
								mock/:
							</code>{" "}
							<span>{entityItems.mock}</span>
						</li>
						<li className="flex gap-2 items-start">
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary text-[11px] font-mono shrink-0">
								schema/:
							</code>{" "}
							<span>{entityItems.schema}</span>
						</li>
					</ul>
					<ul className="space-y-3 text-sm text-muted-foreground">
						<li className="flex gap-2 items-start">
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary text-[11px] font-mono shrink-0">
								slice/:
							</code>{" "}
							<span>{entityItems.slice}</span>
						</li>
						<li className="flex gap-2 items-start">
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary text-[11px] font-mono shrink-0">
								ui/:
							</code>{" "}
							<span>{entityItems.ui}</span>
						</li>
						<li className="flex gap-2 items-start">
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary text-[11px] font-mono shrink-0">
								types/:
							</code>{" "}
							<span>{entityItems.types}</span>
						</li>
						<li className="flex gap-2 items-start">
							<code className="bg-primary/10 px-1 py-0.5 rounded text-primary text-[11px] font-mono shrink-0">
								index.ts:
							</code>{" "}
							<span>{entityItems.index}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
