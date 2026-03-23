import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import { API_CODE_AUTH_QUERY } from "../model";

export async function RtkQueryStepAuthQuery() {
	const t = await getTranslations("rtk_query");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="03" className="text-xl mb-2">
				{t("steps.auth_query.title")}
			</SectionTitle>
			<p>
				{t.rich("steps.auth_query.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<CodeBlock
				code={API_CODE_AUTH_QUERY}
				language="typescript"
				filename="entities/auth/api/auth-base-query.ts"
			/>
		</div>
	);
}
