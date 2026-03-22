import { Card, CardContent, CardHeader, CodeBlock } from "@/shared/ui";

import type { IEntityModuleData } from "../model";

interface IEntityModuleCardProps {
	data: IEntityModuleData;
}

export function EntityModuleCard({ data }: IEntityModuleCardProps) {
	return (
		<Card className="bg-muted/10">
			<CardHeader className="p-4 border-b">
				<h3 className="text-base font-bold text-primary font-mono">
					{data.title}
				</h3>
			</CardHeader>
			<CardContent className="p-4 text-sm text-muted-foreground">
				<p className="mb-4">{data.description}</p>
				<CodeBlock
					code={data.code}
					language="tsx"
					filename={data.filename}
				/>
			</CardContent>
		</Card>
	);
}
