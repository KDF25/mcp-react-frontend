import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CodeBlock,
	withErrorBoundary
} from "@/shared/ui";

import { API_CODE } from "../model";

function EntitiesModulesApiComponent() {
	return (
		<Card className="bg-muted/10">
			<CardHeader className="p-4 border-b">
				<h3 className="text-base font-bold text-primary font-mono">
					/api
				</h3>
			</CardHeader>
			<CardContent className="p-4 text-sm text-muted-foreground flex flex-col gap-4">
				<p>
					Отвечает исключительно за сетевое взаимодействие с
					backend-приложением в рамках одной сущности. Принимает
					аргументы для запроса и возвращает сырые DTO, которые затем
					обязательно передаются в конвертеры.
				</p>
				<Button asChild variant="default" className="w-fit">
					<Link href="/rtk-query" className="flex items-center">
						Изучить архитектуру RTK Query{" "}
						<ArrowRightIcon className="ml-2 w-4 h-4" />
					</Link>
				</Button>
				<CodeBlock
					code={API_CODE}
					language="tsx"
					filename="api/booking-order.service.ts"
				/>
			</CardContent>
		</Card>
	);
}

export const EntitiesModulesApi = withErrorBoundary(
	EntitiesModulesApiComponent
);
