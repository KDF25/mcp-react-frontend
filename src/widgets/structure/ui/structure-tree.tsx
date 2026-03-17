"use client";

import { useTranslation } from "react-i18next";

import { Badge, Card, CardContent, CardHeader, CodeBlock } from "@/shared/ui";

export function StructureTree() {
	const { t } = useTranslation("structure");

	const renderTree = (label: string, lines: string[]) => (
		<div className="space-y-3">
			<Badge variant="outline" className="font-mono text-[10px]">
				{label}
			</Badge>
			<CodeBlock
				code={lines.join("\n")}
				language="text"
				filename="structure-tree.txt"
			/>
		</div>
	);

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					03
				</span>
				{t("tree.title")}
			</h2>

			<div className="grid gap-6">
				<Card className="bg-muted/10">
					<CardHeader className="p-4 pb-2 border-b mb-4">
						<h3 className="text-sm font-bold">
							{t("tree.entity.label")}
						</h3>
					</CardHeader>
					<CardContent className="p-4 pt-0">
						{renderTree("src/entities/invoice/", [
							`├── api/             # ${t("tree.entity.api")}`,
							`├── types/           # ${t("tree.entity.types")}`,
							"│   ├── index.ts",
							"│   ├── invoice.interface.ts",
							"│   └── invoice.types.ts",
							`├── constants/       # ${t("tree.entity.constants")}`,
							`├── converters/      # ${t("tree.entity.converters")}`,
							`├── handlers/        # ${t("tree.entity.handlers")}`,
							`├── mock/            # ${t("tree.entity.mock")}`,
							`├── ui/              # ${t("tree.entity.ui")}`,
							`└── index.ts         # ${t("tree.entity.index")}`
						])}
					</CardContent>
				</Card>

				<Card className="bg-muted/10">
					<CardHeader className="p-4 pb-2 border-b mb-4">
						<h3 className="text-sm font-bold">
							{t("tree.widget.label")}
						</h3>
					</CardHeader>
					<CardContent className="p-4 pt-0">
						{renderTree("src/widgets/accommodation-edit/", [
							`├── model/           # ${t("tree.widget.model")}`,
							`│   ├── config/      # ${t("tree.widget.config")}`,
							`│   ├── schema/      # ${t("tree.widget.schema")}`,
							`│   ├── types/       # ${t("tree.widget.localTypes")}`,
							"│   └── index.ts",
							`├── ui/              # ${t("tree.widget.ui")}`,
							"│   ├── general-info/",
							"│   └── rooms/",
							`├── accommodation-edit.tsx # ${t("tree.widget.main")}`,
							`└── index.ts         # ${t("tree.widget.index")}`
						])}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
