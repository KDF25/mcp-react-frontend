"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";

import {
	Card,
	CardContent,
	CardHeader,
	type ITreeItemData,
	SectionTitle,
	Tree,
	TreeItem,
	TreeItemContent,
	TreeItemLabel,
	withErrorBoundary
} from "@/shared/ui";

import { ENTITIES_TREE_ITEMS } from "../model";

function EntitiesTreeComponent() {
	const entityTree = useTree<ITreeItemData>({
		dataLoader: {
			getChildren: (itemId) => ENTITIES_TREE_ITEMS[itemId].children ?? [],
			getItem: (itemId) => ENTITIES_TREE_ITEMS[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 20,
		initialState: {
			expandedItems: ["root", "entities", "entityName"]
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
		<section>
			<SectionTitle badge="01">Файловая структура</SectionTitle>

			<Card className="bg-muted/10">
				<CardHeader className="p-4 pb-2 border-b mb-4">
					<h3 className="text-sm font-bold">
						Структура слоя Entities
					</h3>
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<p className="text-sm text-foreground/80 mb-4">
						Каждая бизнес-сущность внутри{" "}
						<code>src/entities/*</code> обязана следовать
						жестко-заданной директориальной структуре для изоляции
						логики и UI.
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
											<TreeItemContent item={item} />
										</TreeItemLabel>
									</TreeItem>
								))}
							</Tree>
						</CardContent>
					</Card>
				</CardContent>
			</Card>
		</section>
	);
}

export const EntitiesTree = withErrorBoundary(EntitiesTreeComponent);
