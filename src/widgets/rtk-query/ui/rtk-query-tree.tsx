"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	Tree,
	TreeItem,
	TreeItemLabel,
	withErrorBoundary
} from "@/shared/ui";

import { API_TREE_ITEMS, type TRtkQueryTreeItem } from "../model";

function RtkQueryTreeComponent() {
	const { t } = useTranslation("rtk_query");

	const apiTree = useTree<TRtkQueryTreeItem>({
		dataLoader: {
			getChildren: (itemId) => API_TREE_ITEMS[itemId].children ?? [],
			getItem: (itemId) => API_TREE_ITEMS[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: {
			expandedItems: [
				"root",
				"shared",
				"shared-api",
				"shared-api-backend",
				"entities",
				"auth",
				"auth-api-folder",
				"entity-name",
				"entity-api-folder"
			]
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
		<Card className="border-primary/10 bg-muted/30">
			<CardHeader className="p-4 pb-0">
				<h4 className="font-semibold text-foreground">
					{t("tree_title")}
				</h4>
			</CardHeader>

			<CardContent className="p-4">
				<Tree
					className="before:-ms-1 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
					indent={20}
					tree={apiTree}
				>
					{apiTree.getItems().map((item) => (
						<TreeItem item={item} key={item.getId()}>
							<TreeItemLabel className="before:-inset-y-0.5 before:-z-10 relative before:absolute before:inset-x-0 before:bg-background/0">
								<span className="flex items-center gap-2 py-0.5">
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
	);
}

export const RtkQueryTree = withErrorBoundary(RtkQueryTreeComponent);
