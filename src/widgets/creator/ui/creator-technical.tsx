import { getTranslations } from "next-intl/server";

import { CodeBlock } from "@/shared/ui";

import { CREATOR_DATA } from "../model";

export async function CreatorTechnical() {
	const t = await getTranslations("creator");

	return (
		<section className="space-y-4">
			<h2 className="text-2xl font-semibold tracking-tight">
				{t("technical.title")}
			</h2>
			<CodeBlock
				filename="creator_registry.json"
				language="json"
				code={CREATOR_DATA.technicalContract}
			/>
		</section>
	);
}
