"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { useTranslations } from "next-intl";

import {
	Card,
	CardContent,
	CardHeader,
	type ITreeItemData,
	Tree,
	TreeItem,
	TreeItemContent,
	TreeItemLabel,
	withErrorBoundary
} from "@/shared/ui";

import { MSW_TREE_ITEMS } from "../model";

function MswTreeComponent() {
	const t = useTranslations("msw");

	const mswTree = useTree<ITreeItemData>({
		dataLoader: {
			getChildren: (itemId) => MSW_TREE_ITEMS[itemId].children ?? [],
			getItem: (itemId) => MSW_TREE_ITEMS[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: {
			expandedItems: [
				"root",
				"app",
				"init",
				"entities",
				"entity-name",
				"handlers",
				"mock",
				"shared",
				"s-api",
				"s-msw"
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
					tree={mswTree}
				>
					{mswTree.getItems().map((item) => (
						<TreeItem item={item} key={item.getId()}>
							<TreeItemLabel className="before:-inset-y-0.5 before:-z-10 relative before:absolute before:inset-x-0 before:bg-background/0">
								<TreeItemContent item={item} />
							</TreeItemLabel>
						</TreeItem>
					))}
				</Tree>
			</CardContent>
		</Card>
	);
}

export const MswTree = withErrorBoundary(MswTreeComponent);
