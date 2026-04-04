"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";

import { Tree, TreeItem, TreeItemLabel } from "@/shared/ui";

import { ENTITY_STRUCTURE_ITEMS, Item } from "../model";

export function FsdEntityTree() {
	const entityTree = useTree<Item>({
		dataLoader: {
			getChildren: (itemId) =>
				ENTITY_STRUCTURE_ITEMS[itemId]?.children ?? [],
			getItem: (itemId) => ENTITY_STRUCTURE_ITEMS[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: {
			expandedItems: ["root", "types", "api", "converters", "ui"]
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
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
	);
}
