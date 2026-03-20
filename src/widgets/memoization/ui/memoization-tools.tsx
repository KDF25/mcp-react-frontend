"use client";

import { BrainIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CodeBlock
} from "@/shared/ui";

export function MemoizationTools() {
	const { t } = useTranslation("memoization");

	const tools = ["useMemo", "useCallback", "memo"] as const;

	return (
		<section className="space-y-8">
			<div className="flex items-center gap-3">
				<BrainIcon className="size-6 text-primary" />
				<h2 className="text-2xl font-bold tracking-tight">
					Основные инструменты
				</h2>
			</div>

			<div className="grid gap-6">
				{tools.map((tool) => (
					<Card
						key={tool}
						className="overflow-hidden border-none bg-muted/30"
					>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-xl font-bold font-mono">
								{t(`tools.${tool}.title`)}
							</CardTitle>
							<Badge
								variant="secondary"
								className="uppercase text-[10px]"
							>
								React Hook
							</Badge>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-muted-foreground leading-relaxed">
								{t(`tools.${tool}.description`)}{" "}
								{t(`tools.${tool}.usage`)}
							</p>
							<div className="rounded-md overflow-hidden ring-1 ring-border">
								<CodeBlock
									filename={`${tool}.tsx`}
									language="typescript"
									code={t(`tools.${tool}.code`)}
								/>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
