import {
	Card,
	CardContent,
	CardHeader,
	CodeBlock,
	withErrorBoundary
} from "@/shared/ui";

import { CONVERTERS_CODE } from "../model";

function EntitiesModulesConvertersComponent() {
	return (
		<Card className="bg-muted/10">
			<CardHeader className="p-4 border-b">
				<h3 className="text-base font-bold text-primary font-mono">
					/converters
				</h3>
			</CardHeader>
			<CardContent className="p-4 text-sm text-muted-foreground">
				<p className="mb-4">
					Мапперы данных. Превращают сырой DTO от сервера в удобную
					Domain Model. Это изолирует UI-компоненты от внезапных
					изменений контрактов бекенда.
				</p>
				<CodeBlock
					code={CONVERTERS_CODE}
					language="tsx"
					filename="converters/booking-order.converters.ts"
				/>
			</CardContent>
		</Card>
	);
}

export const EntitiesModulesConverters = withErrorBoundary(
	EntitiesModulesConvertersComponent
);
