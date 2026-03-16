import { Item } from "./fsd.types";

export const ENTITY_STRUCTURE_ITEMS: Record<string, Item> = {
	root: {
		name: "src/entities/invoice",
		children: [
			"api",
			"types",
			"constants",
			"converters",
			"handlers",
			"mock",
			"ui",
			"index"
		]
	},
	api: { name: "api" },
	types: { name: "types", children: ["t_index", "t_interface", "t_types"] },
	t_index: { name: "index.ts" },
	t_interface: { name: "invoice.interface.ts" },
	t_types: { name: "invoice.types.ts" },
	constants: { name: "constants" },
	converters: { name: "converters" },
	handlers: { name: "handlers" },
	mock: { name: "mock" },
	ui: { name: "ui" },
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
