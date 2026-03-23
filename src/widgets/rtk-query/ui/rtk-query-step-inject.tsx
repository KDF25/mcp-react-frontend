import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { API_CODE_INJECT } from "../model";

export async function RtkQueryStepInject() {
	const t = await getTranslations("rtk_query");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="05" className="text-xl mb-2">
				{t("steps.inject.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.inject.description", {
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

			<CodeBlock
				code={API_CODE_INJECT}
				language="typescript"
				filename="entities/booking/order/api/booking-order.service.ts"
			/>
		</div>
	);
}
