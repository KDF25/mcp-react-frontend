import { Item } from "./structure.types";

export const STRUCTURE_ITEMS: Record<string, Item> = {
	root: {
		name: "src",
		children: ["app", "pages", "widgets", "features", "entities", "shared"]
	},
	app: { name: "app", children: ["app_layout", "app_page"] },
	app_layout: { name: "layout.tsx" },
	app_page: { name: "page.tsx" },
	pages: { name: "pages" },
	widgets: { name: "widgets" },
	features: { name: "features" },
	entities: { name: "entities", children: ["rules_entity"] },
	rules_entity: {
		name: "rules",
		children: ["rules_model", "rules_ui", "rules_lib", "rules_api"]
	},
	rules_model: {
		name: "model",
		children: [
			"rules_types",
			"rules_slice",
			"rules_selectors",
			"rules_actions"
		]
	},
	rules_types: { name: "types.ts" },
	rules_slice: { name: "slice.ts" },
	rules_selectors: { name: "selectors.ts" },
	rules_actions: { name: "actions.ts" },
	rules_ui: { name: "ui" },
	rules_lib: { name: "lib", children: ["rules_provider"] },
	rules_provider: { name: "rules-provider.ts" },
	rules_api: { name: "api" },
	shared: { name: "shared", children: ["shared_ui", "shared_config"] },
	shared_ui: { name: "ui", children: ["shadcn_ui"] },
	shadcn_ui: { name: "shadcn-ui" },
	shared_config: { name: "config", children: ["routes_config"] },
	routes_config: { name: "routes.ts" }
};
