"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";

import { Card, CardContent, Tree, TreeItem, TreeItemLabel } from "@/shared/ui";

import { Item, STRUCTURE_ITEMS } from "../model";

export function StructureTree() {
	const tree = useTree<Item>({
		dataLoader: {
			getChildren: (itemId) => STRUCTURE_ITEMS[itemId].children ?? [],
			getItem: (itemId) => STRUCTURE_ITEMS[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: {
			expandedItems: ["root", "entities", "rules_entity", "rules_model"]
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
		<section className="space-y-6">
			<h2 className="text-2xl font-semibold flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					02
				</span>
				Visual Hierarchy (Interactive)
			</h2>
			<Card className="border-primary/10 bg-muted/30">
				<CardContent className="p-6">
					<Tree
						className="before:-ms-1 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
						indent={20}
						tree={tree}
					>
						{tree.getItems().map((item) => {
							return (
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
														? "font-semibold text-foreground/90"
														: "text-muted-foreground"
												}
											>
												{item.getItemName()}
											</span>
										</span>
									</TreeItemLabel>
								</TreeItem>
							);
						})}
					</Tree>
				</CardContent>
			</Card>
		</section>
	);
}
