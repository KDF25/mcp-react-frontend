import { type ITreeItemData } from "@/shared/ui";

export const STYLES_TREE_ITEMS: Record<string, ITreeItemData & { id: string }> =
	{
		root: {
			id: "root",
			name: "root",
			children: ["src", "tailwind-config"]
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
