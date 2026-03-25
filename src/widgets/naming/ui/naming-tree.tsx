"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { useTranslations } from "use-intl";

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

import { NAMING_TREE_ITEMS } from "../model";

function NamingTreeComponent() {
	const t = useTranslations("naming");

	const namingTree = useTree<ITreeItemData>({
		dataLoader: {
			getChildren: (itemId) => NAMING_TREE_ITEMS[itemId]?.children ?? [],
			getItem: (itemId) => NAMING_TREE_ITEMS[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: {
			expandedItems: [
				"root",
				"entities",
				"tour",
				"api",
				"converters",
				"handlers",
				"mock",
				"schema",
				"constants",
				"shared",
				"ui",
				"shadcn-ui",
				"custom",
				"hooks"
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
					tree={namingTree}
				>
					{namingTree.getItems().map((item) => (
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

export const NamingTree = withErrorBoundary(NamingTreeComponent);
