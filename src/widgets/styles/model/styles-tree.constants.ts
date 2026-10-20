import { type ITreeItemData } from "@/shared/ui";

export const STYLES_TREE_ITEMS: Record<string, ITreeItemData & { id: string }> =
	{
		root: {
			id: "root",
			name: "root",
			children: ["src"]
		},
		src: {
			id: "src",
			name: "src/",
			children: ["shared"]
		},
		shared: {
			id: "shared",
			name: "shared/",
			children: ["styles"]
		},
		styles: {
			id: "styles",
			name: "styles/",
			children: ["globals-css", "variables-css", "theme-css"]
		},
		"globals-css": {
			id: "globals-css",
			name: "globals.css"
		},
		"variables-css": {
			id: "variables-css",
			name: "variables.css"
		},
		"theme-css": {
			id: "theme-css",
			name: "theme.css"
		}
	};
