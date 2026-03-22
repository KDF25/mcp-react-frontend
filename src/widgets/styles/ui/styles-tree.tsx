"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { Trans, useTranslation } from "react-i18next";

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

import { STYLES_TREE_ITEMS } from "../model";

function StylesTreeComponent() {
	const { t } = useTranslation("styles");

	const stylesTree = useTree<ITreeItemData>({
		dataLoader: {
			getChildren: (itemId) => STYLES_TREE_ITEMS[itemId]?.children ?? [],
			getItem: (itemId) => STYLES_TREE_ITEMS[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: {
			expandedItems: ["root", "styles-root"]
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
		<Card className="border-primary/10 bg-muted/30">
			<CardHeader className="p-4 pb-0">
				<h4 className="font-semibold text-foreground">
					{t("naming.title")}
				</h4>
			</CardHeader>

			<CardContent className="p-4">
				<div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="flex flex-col gap-1.5 rounded-lg bg-primary/5 p-3 ring-1 ring-primary/10 transition-all hover:bg-primary/10">
						<span className="text-xs font-bold text-primary">
							{t("naming.styles.label")}
						</span>
						<p className="text-[13px] leading-relaxed text-muted-foreground">
							<Trans
								ns="styles"
								i18nKey="naming.styles.text"
								components={[
									<code
										key="0"
										className="bg-primary/5 px-1 py-0.5 rounded text-primary"
									/>
								]}
							/>
						</p>
					</div>
					<div className="flex flex-col gap-1.5 rounded-lg bg-primary/5 p-3 ring-1 ring-primary/10 transition-all hover:bg-primary/10">
						<span className="text-xs font-bold text-primary">
							{t("naming.config.label")}
						</span>
						<p className="text-[13px] leading-relaxed text-muted-foreground">
							<Trans
								ns="styles"
								i18nKey="naming.config.text"
								components={[
									<code
										key="0"
										className="bg-primary/5 px-1 py-0.5 rounded text-primary"
									/>
								]}
							/>
						</p>
					</div>
				</div>

				<Tree
					className="before:-ms-1 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
					indent={20}
					tree={stylesTree}
				>
					{stylesTree.getItems().map((item) => (
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

export const StylesTree = withErrorBoundary(StylesTreeComponent);
