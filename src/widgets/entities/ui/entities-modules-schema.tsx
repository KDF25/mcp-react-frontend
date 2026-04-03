import { ArrowRightIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { ENUM_ROUTES } from "@/shared/config/routes";
import { Button, CodeBlock, SectionTitle } from "@/shared/ui";

import { SCHEMA_CODE } from "../model";

import { Link } from "@/i18n/routing";

export async function EntitiesModulesSchema() {
	const t = await getTranslations("entities");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="05" className="text-xl mb-2">
				{t("modules.schema.title")}
			</SectionTitle>
			<p>
				{t.rich("modules.schema.description", {
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
					)
				})}
			</p>

			<Button asChild variant="default" className="w-fit">
				<Link href={ENUM_ROUTES.MAIN.ZOD} className="flex items-center">
					{t("modules.schema.link")}
					<ArrowRightIcon className="ml-2 w-4 h-4" />
				</Link>
			</Button>

			<CodeBlock
				code={SCHEMA_CODE}
				language="typescript"
				filename="schema/[entity-name].schema.ts"
			/>
		</div>
	);
}
