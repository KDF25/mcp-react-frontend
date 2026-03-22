import {
	Card,
	CardContent,
	CardHeader,
	CodeBlock,
	withErrorBoundary
} from "@/shared/ui";

import { TYPES_CODE } from "../model";

function EntitiesModulesTypesComponent() {
	return (
		<Card className="bg-muted/10">
			<CardHeader className="p-4 border-b">
				<h3 className="text-base font-bold text-primary font-mono">
					/types
				</h3>
			</CardHeader>
			<CardContent className="p-4 text-sm text-muted-foreground">
				<p className="mb-4">
					Каталог TypeScript интерфейсов, описывающих сущность.
					Подразделяется на *.interface.ts и *.types.ts.
				</p>
				<CodeBlock
					code={TYPES_CODE}
					language="tsx"
					filename="types/order.interface.ts"
				/>
			</CardContent>
		</Card>
	);
}

export const EntitiesModulesTypes = withErrorBoundary(
	EntitiesModulesTypesComponent
);
