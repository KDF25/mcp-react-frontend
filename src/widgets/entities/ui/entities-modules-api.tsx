import { ArrowRightIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { ENUM_ROUTES } from "@/shared/config/routes";
import { Button, CodeBlock, SectionTitle } from "@/shared/ui";

import { API_CODE } from "../model";

import { Link } from "@/i18n/routing";

export async function EntitiesModulesApi() {
	const t = await getTranslations("entities");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("modules.api.title")}
			</SectionTitle>
			<p>
				{t.rich("modules.api.description", {
					one: (chunks) => (
						<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
							{chunks}
						</code>
					)
				})}
			</p>

			<Button asChild variant="default" className="w-fit">
				<Link
					href={ENUM_ROUTES.MAIN.RTK_QUERY}
					className="flex items-center"
				>
					{t("modules.api.link")}
					<ArrowRightIcon className="ml-2 w-4 h-4" />
				</Link>
			</Button>

			<CodeBlock
				code={API_CODE}
				language="typescript"
				filename="api/[entity-name].api.ts"
			/>
		</div>
	);
}
