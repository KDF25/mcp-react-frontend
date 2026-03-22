import {
	Card,
	CardContent,
	CardHeader,
	CodeBlock,
	withErrorBoundary
} from "@/shared/ui";

import { SLICE_CODE } from "../model";

function EntitiesModulesSliceComponent() {
	return (
		<Card className="bg-muted/10">
			<CardHeader className="p-4 border-b">
				<h3 className="text-base font-bold text-primary font-mono">
					/slice
				</h3>
			</CardHeader>
			<CardContent className="p-4 text-sm text-muted-foreground">
				<p className="mb-4">
					Хранит локальное состояние сущности (UI-слой), не связанное
					с кэшом сервера. Например: текущий выбранный элемент.
				</p>
				<CodeBlock
					code={SLICE_CODE}
					language="tsx"
					filename="slice/order.slice.ts"
				/>
			</CardContent>
		</Card>
	);
}

export const EntitiesModulesSlice = withErrorBoundary(
	EntitiesModulesSliceComponent
);
