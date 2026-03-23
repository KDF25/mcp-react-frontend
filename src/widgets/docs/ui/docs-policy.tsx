import { getTranslations } from "next-intl/server";

export async function DocsPolicy() {
	const t = await getTranslations("docs");

	return (
		<div className="rounded-lg border bg-primary/5 p-6 border-primary/20">
			<h3 className="text-lg font-bold mb-2">{t("policy.title")}</h3>
			<p className="text-sm text-muted-foreground leading-relaxed">
				{t("policy.description")}
			</p>
		</div>
	);
}
