"use client";

import { useTranslation } from "react-i18next";

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CodeBlock,
	withErrorBoundary
} from "@/shared/ui";

import { RulesProvider } from "@/entities/rules";

import { STYLES_DATA } from "../model";

function StylesDataFetchingComponent() {
	const { t } = useTranslation("styles");
	const fetchingRules = RulesProvider.getRules().patterns.dataFetching;

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					03
				</span>
				{t("fetching.title")}
			</h2>

			<div className="grid gap-6">
				<div className="space-y-4">
					<p className="text-muted-foreground leading-relaxed max-w-2xl">
						{fetchingRules.description}
					</p>
					<div className="flex gap-2">
						{fetchingRules.segments.map((segment) => (
							<Badge key={segment} variant="secondary">
								{segment}
							</Badge>
						))}
					</div>
				</div>

				<Card className="bg-muted/30 border-none shadow-none">
					<CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
						<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
							Centralized API Schema
						</span>
						<Badge variant="outline" className="text-[9px]">
							RTK QUERY
						</Badge>
					</CardHeader>
					<CardContent className="p-4 pt-0">
						<CodeBlock
							code={STYLES_DATA.rtkQuery}
							language="typescript"
							filename="api-schema.ts"
						/>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

export const StylesDataFetching = withErrorBoundary(
	StylesDataFetchingComponent
);
