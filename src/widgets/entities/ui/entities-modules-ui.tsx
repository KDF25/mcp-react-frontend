import {
	Card,
	CardContent,
	CardHeader,
	CodeBlock,
	withErrorBoundary
} from "@/shared/ui";

import { UI_CODE } from "../model";

function EntitiesModulesUiComponent() {
	return (
		<Card className="bg-muted/10">
			<CardHeader className="p-4 border-b">
				<h3 className="text-base font-bold text-primary font-mono">
					/ui
				</h3>
			</CardHeader>
			<CardContent className="p-4 text-sm text-muted-foreground">
				<p className="mb-4">
					Набор &quot;глупых&quot; (dumb) компонентов отображения,
					привязанных к данной сущности. Не содержат логики запросов.
				</p>
				<CodeBlock
					code={UI_CODE}
					language="tsx"
					filename="ui/order-card.tsx"
				/>
			</CardContent>
		</Card>
	);
}

export const EntitiesModulesUi = withErrorBoundary(EntitiesModulesUiComponent);
