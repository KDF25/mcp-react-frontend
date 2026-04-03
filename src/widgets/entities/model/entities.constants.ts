import { ITreeItemData } from "@/shared/ui";

export const ENTITIES_TREE_ITEMS: Record<string, ITreeItemData> = {
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
	api: { name: "api/", children: ["apiFile", "apiIndex"] },
	apiFile: { name: "[entity-name].api.ts" },
	apiIndex: { name: "index.ts" },

	converters: {
		name: "converters/",
		children: ["convertersFile", "convertersIndex"]
	},
	convertersFile: { name: "[entity-name].converters.ts" },
	convertersIndex: { name: "index.ts" },

	handlers: {
		name: "handlers/",
		children: ["handlersFile", "handlersIndex"]
	},
	handlersFile: { name: "[entity-name].handlers.ts" },
	handlersIndex: { name: "index.ts" },

	mock: { name: "mock/", children: ["mockFile", "mockIndex"] },
	mockFile: { name: "[entity-name].mock.ts" },
	mockIndex: { name: "index.ts" },

	schema: { name: "schema/", children: ["schemaFile", "schemaIndex"] },
	schemaFile: { name: "[entity-name].schema.ts" },
	schemaIndex: { name: "index.ts" },

	slice: { name: "slice/", children: ["sliceFile", "sliceIndex"] },
	sliceFile: { name: "[entity-name].slice.ts" },
	sliceIndex: { name: "index.ts" },

	types: {
		name: "types/",
		children: ["typesFrontend", "typesBackend", "typesIndex"]
	},
	typesFrontend: { name: "[entity-name].types.ts" },
	typesBackend: { name: "[entity-name].backend.interface.ts" },
	typesIndex: { name: "index.ts" },

	ui: { name: "ui/", children: ["uiCard", "uiIndex"] },
	uiCard: { name: "[entity-name]-card.tsx" },
	uiIndex: { name: "index.ts" },

	index: { name: "index.ts" }
};
