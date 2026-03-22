import { type ITreeItemData } from "@/shared/ui";

export const STYLES_TREE_ITEMS: Record<string, ITreeItemData & { id: string }> =
	{
		root: {
			id: "root",
			name: "root",
			children: ["styles-root", "tailwind-config"]
		},
		"styles-root": {
			id: "styles-root",
			name: "src/shared/styles",
			children: ["global-css", "variables-css", "theme-css"]
		},
		"global-css": {
			id: "global-css",
			name: "global.css"
		},
		"variables-css": {
			id: "variables-css",
			name: "variables.css"
		},
		"theme-css": {
			id: "theme-css",
			name: "theme.css"
		},
		"tailwind-config": {
			id: "tailwind-config",
			name: "tailwind.config.ts"
		}
	};
