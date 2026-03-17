"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, Tree, TreeItem, TreeItemLabel } from "@/shared/ui";

import { Item, WIDGET_STRUCTURE_ITEMS } from "../model";

export function WidgetModelStructure() {
	const { t } = useTranslation("fsd");
	const widgetTree = useTree<Item>({
		dataLoader: {
			getChildren: (itemId) =>
				WIDGET_STRUCTURE_ITEMS[itemId].children ?? [],
			getItem: (itemId) => WIDGET_STRUCTURE_ITEMS[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: {
			expandedItems: ["root", "model", "ui_folder"]
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
		<section id="widgets-structure">
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					04
				</span>
				{t("widgets.title")}
			</h2>
			<div className="space-y-4">
				<p className="text-muted-foreground text-sm">
					{t("widgets.description")}
				</p>

				<Card className="border-primary/10 bg-muted/30">
					<CardContent className="p-6">
						<Tree
							className="before:-ms-1 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
							indent={20}
							tree={widgetTree}
						>
							{widgetTree.getItems().map((item) => (
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

				<Card className="border-primary/10 bg-primary/5">
					<CardContent className="p-4 text-sm">
						<p>
							<strong>{t("widgets.importance_title")}:</strong>{" "}
							{t("widgets.importance_desc")}
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
