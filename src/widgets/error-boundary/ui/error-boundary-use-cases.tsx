import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { ERROR_BOUNDARY_HOC_USAGE } from "../model";

export async function ErrorBoundaryUseCases() {
	const t = await getTranslations("error_boundary");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("when_to_use.title")}
			</SectionTitle>
			<div className="grid gap-6">
				<div className="space-y-2">
					<span className="font-bold text-foreground">
						{t("when_to_use.isolation.label")}
					</span>
					<p>
						{t.rich("when_to_use.isolation.text", {
							one: (chunks) => (
								<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
									{chunks}
								</code>
							)
						})}
					</p>
				</div>
				<div className="space-y-2">
					<span className="font-bold text-foreground">
						{t("when_to_use.boundaries.label")}
					</span>
					<p>
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
				</div>
				<div className="space-y-2">
					<span className="font-bold text-foreground">
						{t("when_to_use.dynamic.label")}
					</span>
					<p>{t("when_to_use.dynamic.text")}</p>
				</div>
			</div>

			<div className="pt-4">
				<CodeBlock
					code={ERROR_BOUNDARY_HOC_USAGE}
					language="typescript"
					filename="HOC Usage (Recommended for FSD)"
				/>
			</div>
		</div>
	);
}
