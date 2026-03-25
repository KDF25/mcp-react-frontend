import { ITreeItemData } from "@/shared/ui";

export const ERROR_BOUNDARY_TREE_ITEMS: Record<string, ITreeItemData> = {
	root: { name: "src", children: ["shared"] },
	shared: { name: "shared", children: ["ui"] },
	ui: { name: "ui", children: ["eb"] },
	eb: { name: "error-boundary", children: ["comp", "hoc", "index"] },
	comp: { name: "error-boundary.tsx" },
	hoc: { name: "with-error-boundary.tsx" },
	index: { name: "index.ts" }
};
