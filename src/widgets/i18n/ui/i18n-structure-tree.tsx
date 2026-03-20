"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import {
	FileCodeIcon,
	FolderIcon,
	FolderOpenIcon,
	LayersIcon
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, Tree, TreeItem, TreeItemLabel } from "@/shared/ui";
import { withErrorBoundary } from "@/shared/ui";

import { I18N_STRUCTURE_ITEMS, Item } from "../model";

function I18nStructureTreeComponent() {
	const { t } = useTranslation("i18n");
	const i18nTree = useTree<Item>({
		dataLoader: {
			getChildren: (itemId) =>
				I18N_STRUCTURE_ITEMS[itemId].children ?? [],
			getItem: (itemId) => I18N_STRUCTURE_ITEMS[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 18,
		initialState: {
			expandedItems: [
				"root",
				"shared",
				"config",
				"i18n",
				"languages",
				"types"
			]
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
		<aside className="space-y-6 lg:sticky lg:top-24 h-fit">
			<div className="space-y-2">
				<h2 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
					<LayersIcon className="size-4" /> {t("structure.title")}
				</h2>
				<p className="text-[11px] text-muted-foreground uppercase tracking-tighter">
					Shared layer overview
				</p>
			</div>
			<Card className="border-primary/10 bg-muted/20 backdrop-blur-sm shadow-xl">
				<CardContent className="p-4">
					<Tree
						indent={16}
						tree={i18nTree}
						className="text-[12px] font-mono"
					>
						{i18nTree.getItems().map((item) => (
							<TreeItem item={item} key={item.getId()}>
								<TreeItemLabel>
									<span className="flex items-center gap-2 py-1">
										{item.isFolder() ? (
											item.isExpanded() ? (
												<FolderOpenIcon className="size-3.5 text-primary" />
											) : (
												<FolderIcon className="size-3.5 text-primary" />
											)
										) : (
											<FileCodeIcon className="size-3.5 text-muted-foreground/60" />
										)}
										<span
											className={
												item.isFolder()
													? "font-bold text-foreground"
													: "text-foreground/80"
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
		</aside>
	);
}

export const I18nStructureTree = withErrorBoundary(I18nStructureTreeComponent);
