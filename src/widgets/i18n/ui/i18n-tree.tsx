"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

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

import { I18N_TREE_ITEMS_NEXT, I18N_TREE_ITEMS_VITE } from "../model";

interface I18nTreeCardProps {
	items: Record<string, ITreeItemData>;
	title: string;
	expandedItems: string[];
}

function I18nTreeCard({ items, title, expandedItems }: I18nTreeCardProps) {
	const tree = useTree<ITreeItemData>({
		dataLoader: {
			getChildren: (itemId) => items[itemId]?.children ?? [],
			getItem: (itemId) => items[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: { expandedItems },
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
		<Card className="border-primary/10 bg-muted/30">
			<CardHeader className="p-4 pb-0">
				<h4 className="font-semibold text-foreground">{title}</h4>
			</CardHeader>
			<CardContent className="p-4">
				<Tree
					className="before:-ms-1 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
					indent={20}
					tree={tree}
				>
					{tree.getItems().map((item) => (
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

function I18nTreesComponent() {
	const t = useTranslations("i18n");

	const viteExpanded = useMemo(
		() => [
			"root",
			"src-root",
			"shared-config",
			"i18n-folder",
			"public-locales",
			"lang-en"
		],
		[]
	);

	const nextExpanded = useMemo(
		() => [
			"root",
			"src-root",
			"shared-config",
			"i18n-folder",
			"shared-i18n",
			"messages-root",
			"msg-en"
		],
		[]
	);

	return (
		<div className="space-y-4">
			<I18nTreeCard
				items={I18N_TREE_ITEMS_VITE}
				title={t("tree_vite_title")}
				expandedItems={viteExpanded}
			/>
			<I18nTreeCard
				items={I18N_TREE_ITEMS_NEXT}
				title={t("tree_next_title")}
				expandedItems={nextExpanded}
			/>
		</div>
	);
}

export const I18nTree = withErrorBoundary(I18nTreesComponent);
