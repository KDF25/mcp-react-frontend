import { Item } from "./fsd.types";

export const ENTITY_STRUCTURE_ITEMS: Record<string, Item> = {
	root: {
		name: "src/entities/invoice",
		children: [
			"api",
			"converters",
			"handlers",
			"mock",
			"schema",
			"slice",
			"ui",
			"types",
			"index"
		]
	},
	api: {
		name: "api",
		children: ["api_file"]
	},
	api_file: { name: "invoice.api.ts" },
	converters: {
		name: "converters",
		children: ["conv_file"]
	},
	conv_file: { name: "invoice.converters.ts" },
	handlers: {
		name: "handlers",
		children: ["hand_file"]
	},
	hand_file: { name: "invoice.handlers.ts" },
	mock: {
		name: "mock",
		children: ["mock_file"]
	},
	mock_file: { name: "invoice.mock.ts" },
	schema: {
		name: "schema",
		children: ["schema_file"]
	},
	schema_file: { name: "invoice.schema.ts" },
	slice: {
		name: "slice",
		children: ["slice_file"]
	},
	slice_file: { name: "invoice.slice.ts" },
	ui: {
		name: "ui",
		children: ["ui_file"]
	},
	ui_file: { name: "invoice-card.tsx" },
	types: {
		name: "types",
		children: ["t_index", "t_interface", "t_backend"]
	},
	t_index: { name: "index.ts" },
	t_interface: { name: "invoice.interface.ts" },
	t_backend: { name: "invoice.backend.interface.ts" },
	index: { name: "index.ts" }
};

export const WIDGET_STRUCTURE_ITEMS: Record<string, Item> = {
	root: {
		name: "src/widgets/accommodation-edit",
		children: ["model", "ui_folder", "main_file", "index_w"]
	},
	model: {
		name: "model",
		children: ["m_config", "m_schema", "m_types", "m_index"]
	},
	m_config: { name: "config" },
	m_schema: { name: "schema" },
	m_types: { name: "types" },
	m_index: { name: "index.ts" },
	ui_folder: { name: "ui", children: ["ui_general", "ui_rooms"] },
	ui_general: { name: "general-info" },
	ui_rooms: { name: "rooms" },
	main_file: { name: "accommodation-edit.tsx" },
	index_w: { name: "index.ts" }
};
