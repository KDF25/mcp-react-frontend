"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, Tree, TreeItem, TreeItemLabel } from "@/shared/ui";

import { ENTITY_STRUCTURE_ITEMS, Item } from "../model";

export function EntityStructure() {
	const { t } = useTranslation("fsd");
	const entityItems = t("entities.items", {
		returnObjects: true,
		defaultValue: {}
	}) as Record<string, string>;

	const entityTree = useTree<Item>({
		dataLoader: {
			getChildren: (itemId) =>
				ENTITY_STRUCTURE_ITEMS[itemId].children ?? [],
			getItem: (itemId) => ENTITY_STRUCTURE_ITEMS[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: {
			expandedItems: ["root", "types"]
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
		<section id="entities-structure">
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					03
				</span>
				{t("entities.title")}
			</h2>
			<div className="space-y-4">
				<p className="text-muted-foreground text-sm">
					{t("entities.description")}
				</p>

				<Card className="border-primary/10 bg-muted/30">
					<CardContent className="p-6">
						<Tree
							className="before:-ms-1 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
							indent={20}
							tree={entityTree}
						>
							{entityTree.getItems().map((item) => (
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

				<div className="grid gap-4 md:grid-cols-2 mt-4">
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li className="flex gap-2">
							<strong className="text-foreground">api:</strong>{" "}
							{entityItems.api}
						</li>
						<li className="flex gap-2">
							<strong className="text-foreground">types:</strong>{" "}
							{entityItems.types}
						</li>
						<li className="flex gap-2">
							<strong className="text-foreground">
								converters:
							</strong>{" "}
							{entityItems.converters}
						</li>
					</ul>
					<ul className="space-y-2 text-sm text-muted-foreground">
						<li className="flex gap-2">
							<strong className="text-foreground">
								handlers:
							</strong>{" "}
							{entityItems.handlers}
						</li>
						<li className="flex gap-2">
							<strong className="text-foreground">mock:</strong>{" "}
							{entityItems.mock}
						</li>
						<li className="flex gap-2">
							<strong className="text-foreground">
								index.ts:
							</strong>{" "}
							{entityItems.index}
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
