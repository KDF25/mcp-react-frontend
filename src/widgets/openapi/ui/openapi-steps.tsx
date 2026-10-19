import { getTranslations } from "next-intl/server";

import { CodeBlock, SectionTitle } from "@/shared/ui";

import {
	OPENAPI_CODE_ADAPTER,
	OPENAPI_CODE_CONVERTER_BAD,
	OPENAPI_CODE_CONVERTER_OK,
	OPENAPI_CODE_ESLINT,
	OPENAPI_CODE_GENERATE_PATHS,
	OPENAPI_CODE_GENERATE_TYPES,
	OPENAPI_CODE_PACKAGE_SCRIPTS
} from "../model";

export async function OpenapiSteps() {
	const t = await getTranslations("openapi");

	return (
		<div className="flex flex-col gap-6">
			<div className="space-y-4 pt-4 border-t border-border/40">
				<SectionTitle badge="01" className="text-xl mb-2">
					{t("steps.scripts.title")}
				</SectionTitle>
				<div className="text-muted-foreground">
					{t.rich("steps.scripts.description", {
						one: (chunks) => (
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
								{chunks}
							</code>
						)
					})}
				</div>
				<CodeBlock
					code={OPENAPI_CODE_PACKAGE_SCRIPTS}
					language="json"
					filename="package.json"
				/>
				<CodeBlock
					code={OPENAPI_CODE_GENERATE_TYPES}
					language="typescript"
					filename="scripts/generate-api-types.ts"
				/>
				<CodeBlock
					code={OPENAPI_CODE_GENERATE_PATHS}
					language="typescript"
					filename="scripts/generate-api-paths.ts (excerpt)"
				/>
			</div>

			<div className="space-y-4 pt-4 border-t border-border/40">
				<SectionTitle badge="02" className="text-xl mb-2">
					{t("steps.adapter.title")}
				</SectionTitle>
				<div className="text-muted-foreground">
					{t.rich("steps.adapter.description", {
						one: (chunks) => (
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
								{chunks}
							</code>
						)
					})}
				</div>
				<CodeBlock
					code={OPENAPI_CODE_ADAPTER}
					language="typescript"
					filename="entities/[entity]/types/[entity]-backend.interface.ts"
				/>
			</div>

			<div className="space-y-4 pt-4 border-t border-border/40">
				<SectionTitle badge="03" className="text-xl mb-2">
					{t("steps.usage.title")}
				</SectionTitle>
				<div className="text-muted-foreground">
					{t("steps.usage.description")}
				</div>
				<CodeBlock
					code={OPENAPI_CODE_CONVERTER_OK}
					language="typescript"
					filename="converters — OK"
				/>
				<CodeBlock
					code={OPENAPI_CODE_CONVERTER_BAD}
					language="typescript"
					filename="converters / api — FORBIDDEN"
				/>
			</div>

			<div className="space-y-4 pt-4 border-t border-border/40">
				<SectionTitle badge="04" className="text-xl mb-2">
					{t("steps.eslint.title")}
				</SectionTitle>
				<div className="text-muted-foreground">
					{t.rich("steps.eslint.description", {
						one: (chunks) => (
							<code className="bg-primary/5 px-1 py-0.5 rounded text-primary">
								{chunks}
							</code>
						)
					})}
				</div>
				<CodeBlock
					code={OPENAPI_CODE_ESLINT}
					language="javascript"
					filename="eslint.config.js"
				/>
			</div>
		</div>
	);
}
