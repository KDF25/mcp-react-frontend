import type { TEntityTreeItem } from "./entities.types";

export const ENTITIES_TREE_ITEMS: Record<string, TEntityTreeItem> = {
	root: { name: "src/", children: ["entities"] },
	entities: { name: "entities/", children: ["entityName"] },
	entityName: {
		name: "[entity-name]/",
		children: [
			"api",
			"converters",
			"handlers",
			"mock",
			"schema",
			"slice",
			"types",
			"ui",
			"index"
		]
	},
	api: { name: "api/" },
	converters: { name: "converters/" },
	handlers: { name: "handlers/" },
	mock: { name: "mock/" },
	schema: { name: "schema/" },
	slice: { name: "slice/" },
	types: { name: "types/" },
	ui: { name: "ui/" },
	index: { name: "index.ts" }
};
