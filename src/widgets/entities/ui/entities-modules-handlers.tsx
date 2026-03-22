import {
	Card,
	CardContent,
	CardHeader,
	CodeBlock,
	withErrorBoundary
} from "@/shared/ui";

import { HANDLERS_CODE } from "../model";

function EntitiesModulesHandlersComponent() {
	return (
		<Card className="bg-muted/10">
			<CardHeader className="p-4 border-b">
				<h3 className="text-base font-bold text-primary font-mono">
					/handlers
				</h3>
			</CardHeader>
			<CardContent className="p-4 text-sm text-muted-foreground">
				<p className="mb-4">
					Обработчики MSW (Mock Service Worker). Используются для
					перехвата сетевых вызовов во время разработки и в
					интеграционных тестах (Vitest / RTL).
				</p>
				<CodeBlock
					code={HANDLERS_CODE}
					language="tsx"
					filename="handlers/booking-order.handlers.ts"
				/>
			</CardContent>
		</Card>
	);
}

export const EntitiesModulesHandlers = withErrorBoundary(
	EntitiesModulesHandlersComponent
);
