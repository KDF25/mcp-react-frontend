"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";

import { Badge, Card, CardContent, CodeBlock } from "@/shared/ui";
import { Tree, TreeItem, TreeItemLabel } from "@/shared/ui";

interface Item {
	name: string;
	children?: string[];
}

const zodStructureItems: Record<string, Item> = {
	root: { name: "src/entities/user", children: ["schema", "types"] },
	schema: { name: "schema", children: ["s_account"] },
	s_account: { name: "account.schema.ts" },
	types: { name: "types", children: ["t_account"] },
	t_account: { name: "account.types.ts" }
};

const schemaCode = `import { z } from "zod";
import { type TAccountSettingsPageKeys, i18nKey } from "@/shared/config";
import { ENUM_FORM_ACCOUNT } from "../types";

const msg = i18nKey<TAccountSettingsPageKeys>();

export const ACCOUNT_SCHEMA = z.object({
    [ENUM_FORM_ACCOUNT.LOGIN]: z
        .string()
        .min(1, { message: msg("form.personal.fields.login.errors.required") })
        .min(3, { message: msg("form.personal.fields.login.errors.min") }),
});`;

const typesCode = `import type z from "zod";
import type { ACCOUNT_SCHEMA } from "../schema";

export const ENUM_FORM_ACCOUNT = {
    LOGIN: "login",
} as const;

export type TAccountSchema = z.infer<typeof ACCOUNT_SCHEMA>;`;

export default function ZodPage() {
	const zodTree = useTree<Item>({
		dataLoader: {
			getChildren: (itemId) => zodStructureItems[itemId].children ?? [],
			getItem: (itemId) => zodStructureItems[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: {
			expandedItems: ["root", "schema", "types"]
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
		<>
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					Zod Validation & Typing
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					Связка схем валидации, автоматической типизации и
					локализованных сообщений об ошибках.
				</p>
			</div>

			<div className="space-y-12">
				<section>
					<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
						<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
							01
						</span>
						Patterns Architecture
					</h2>
					<Card className="border-primary/10 bg-muted/30">
						<CardContent className="p-6">
							<Tree
								className="before:-ms-1 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
								indent={20}
								tree={zodTree}
							>
								{zodTree.getItems().map((item) => (
									<TreeItem item={item} key={item.getId()}>
										<TreeItemLabel className="before:-inset-y-0.5 before:-z-10 relative before:absolute before:inset-x-0 before:bg-background/0">
											<span className="flex items-center gap-2">
												{item.isFolder() ? (
													item.isExpanded() ? (
														<FolderOpenIcon className="size-4 text-primary/70" />
													) : (
														<FolderIcon className="size-4 text-primary/70" />
													)
												) : (
													<FileIcon className="size-4 text-primary/40" />
												)}
												<span
													className={
														item.isFolder()
															? "font-semibold text-foreground/90 text-sm"
															: "text-muted-foreground text-sm"
													}
												>
													{item.getItemName()}
												</span>
											</span>
										</TreeItemLabel>
									</TreeItem>
								))}
							</Tree>
						</CardContent>
					</Card>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
						<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
							02
						</span>
						Integrated Pattern (Schema + Types)
					</h2>
					<div className="grid gap-6">
						<div className="space-y-4">
							<Badge variant="secondary">Schema Definition</Badge>
							<CodeBlock
								filename="schema/account.schema.ts"
								language="typescript"
								code={schemaCode}
							/>
						</div>
						<div className="space-y-4">
							<Badge variant="secondary">Type Extraction</Badge>
							<CodeBlock
								filename="types/account.types.ts"
								language="typescript"
								code={typesCode}
							/>
						</div>
					</div>
				</section>

				<section className="bg-primary/5 p-6 rounded-xl border border-primary/10">
					<h3 className="font-bold text-lg mb-2">
						Почему это важно:
					</h3>
					<ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
						<li>
							<strong>Типизированный msg:</strong> Предотвращает
							опечатки в ключах i18n внутри схем.
						</li>
						<li>
							<strong>ENUM_FORM:</strong> Гарантирует совпадение
							имен полей в схеме, типах и HTML-форме.
						</li>
						<li>
							<strong>z.infer:</strong> Исключает необходимость
							ручного описания интерфейсов для форм.
						</li>
					</ul>
				</section>
			</div>
		</>
	);
}
