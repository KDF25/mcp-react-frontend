import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { I18N_CODE_USAGE_NEXT, I18N_CODE_USAGE_VITE } from "../model";

export async function I18nStepUsage() {
	const t = await getTranslations("i18n");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="07" className="text-xl mb-2">
				{t("steps.usage.title")}
			</SectionTitle>
			<div className="text-muted-foreground">
				{t.rich("steps.usage.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					),
					two: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					),
					three: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					),
					four: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</div>

			<div className="space-y-6">
				<div className="space-y-2">
					<p className="text-sm font-medium text-foreground">
						{t("steps.usage.vite_title")}
					</p>
					<p className="text-sm text-muted-foreground">
						{t.rich("steps.usage.vite_hint", {
							one: (chunks) => (
								<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
									{chunks}
								</code>
							)
						})}
					</p>
					<CodeBlock
						code={I18N_CODE_USAGE_VITE}
						language="typescript"
						filename="Vite — react-i18next + public/locales"
					/>
				</div>

				<div className="space-y-2">
					<p className="text-sm font-medium text-foreground">
						{t("steps.usage.next_title")}
					</p>
					<p className="text-sm text-muted-foreground">
						{t.rich("steps.usage.next_hint", {
							one: (chunks) => (
								<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
									{chunks}
								</code>
							)
						})}
					</p>
					<CodeBlock
						code={I18N_CODE_USAGE_NEXT}
						language="typescript"
						filename="Next.js — next-intl + messages/"
					/>
				</div>
			</div>
		</div>
	);
}
