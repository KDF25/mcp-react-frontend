import { ITreeItemData } from "@/shared/ui";

export const THEME_TREE_ITEMS: Record<string, ITreeItemData> = {
	root: {
		name: "src/",
		children: ["app-folder", "shared-folder"]
	},
	"app-folder": {
		name: "app/",
		children: ["app-providers"]
	},
	"app-providers": {
		name: "providers/",
		children: ["theme-provider-folder"]
	},
	"theme-provider-folder": {
		name: "theme/",
		children: ["theme-index", "theme-provider", "with-theme"]
	},
	"theme-index": { name: "index.ts" },
	"theme-provider": { name: "theme.provider.tsx" },
	"with-theme": { name: "with-theme.tsx" },
	"shared-folder": {
		name: "shared/ui/",
		children: ["theme-toggle-folder"]
	},
	"theme-toggle-folder": {
		name: "layout/theme-toggle/",
		children: ["toggle-folder-index", "toggle-model", "toggle-ui"]
	},
	"toggle-folder-index": { name: "index.ts" },
	"toggle-model": {
		name: "model/",
		children: [
			"toggle-model-index",
			"toggle-context",
			"toggle-types",
			"toggle-hook"
		]
	},
	"toggle-model-index": { name: "index.ts" },
	"toggle-context": { name: "theme.context.ts" },
	"toggle-types": { name: "theme.types.ts" },
	"toggle-hook": { name: "useTheme.tsx" },
	"toggle-ui": {
		name: "ui/",
		children: ["toggle-ui-index", "toggle-component"]
	},
	"toggle-ui-index": { name: "index.ts" },
	"toggle-component": { name: "theme-toggle.tsx" }
};
