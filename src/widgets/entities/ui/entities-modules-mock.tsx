import {
	Card,
	CardContent,
	CardHeader,
	CodeBlock,
	withErrorBoundary
} from "@/shared/ui";

import { MOCK_CODE } from "../model";

function EntitiesModulesMockComponent() {
	return (
		<Card className="bg-muted/10">
			<CardHeader className="p-4 border-b">
				<h3 className="text-base font-bold text-primary font-mono">
					/mock
				</h3>
			</CardHeader>
			<CardContent className="p-4 text-sm text-muted-foreground">
				<p className="mb-4">
					Статические фикстуры и фейковые данные (mock data),
					используемые для эмуляции ответа сервера в связке с MSW
					handlers или для Storybook.
				</p>
				<CodeBlock
					code={MOCK_CODE}
					language="tsx"
					filename="mock/booking-order.mock.ts"
				/>
			</CardContent>
		</Card>
	);
}

export const EntitiesModulesMock = withErrorBoundary(
	EntitiesModulesMockComponent
);
