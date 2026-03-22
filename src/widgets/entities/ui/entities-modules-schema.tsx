import {
	Card,
	CardContent,
	CardHeader,
	CodeBlock,
	withErrorBoundary
} from "@/shared/ui";

import { SCHEMA_CODE } from "../model";

function EntitiesModulesSchemaComponent() {
	return (
		<Card className="bg-muted/10">
			<CardHeader className="p-4 border-b">
				<h3 className="text-base font-bold text-primary font-mono">
					/schema
				</h3>
			</CardHeader>
			<CardContent className="p-4 text-sm text-muted-foreground">
				<p className="mb-4">
					Single Source of Truth для типов данных сущности. Содержит
					Zod-объекты со встроенной интернационализацией (i18n)
					ошибок.
				</p>
				<CodeBlock
					code={SCHEMA_CODE}
					language="tsx"
					filename="schema/order.schema.ts"
				/>
			</CardContent>
		</Card>
	);
}

export const EntitiesModulesSchema = withErrorBoundary(
	EntitiesModulesSchemaComponent
);
