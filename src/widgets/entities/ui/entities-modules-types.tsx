import { ArrowRightIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { ENUM_ROUTES } from "@/shared/config/routes";
import { Button, CodeBlock, SectionTitle } from "@/shared/ui";

import { TYPES_CODE } from "../model";

import { Link } from "@/i18n/routing";

export async function EntitiesModulesTypes() {
	const t = await getTranslations("entities");

	return (
		<div className="space-y-4 pt-4 border-t border-border/40">
			<SectionTitle badge="08" className="text-xl mb-2">
				{t("modules.types.title")}
			</SectionTitle>
			<p>
				{t.rich("modules.types.description", {
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
					{t("modules.types.link")}
					<ArrowRightIcon className="ml-2 w-4 h-4" />
				</Link>
			</Button>

			<CodeBlock
				code={TYPES_CODE}
				language="typescript"
				filename="types/[entity-name].types.ts"
			/>
		</div>
	);
}
