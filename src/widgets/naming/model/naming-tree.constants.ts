import { ITreeItemData } from "@/shared/ui";

export const NAMING_TREE_ITEMS: Record<string, ITreeItemData> = {
	root: { name: "src", children: ["entities", "shared", "configs"] },
	entities: { name: "entities", children: ["tour"] },
	tour: {
		name: "tour",
		children: [
			"api",
			"converters",
			"handlers",
			"mock",
			"schema",
			"constants"
		]
	},
	api: { name: "api", children: ["tour-service"] },
	"tour-service": { name: "tour.service.ts" },
	converters: { name: "converters", children: ["tour-converters"] },
	"tour-converters": { name: "tour.converters.ts" },
	handlers: { name: "handlers", children: ["tour-handlers"] },
	"tour-handlers": { name: "tour.handlers.ts" },
	mock: { name: "mock", children: ["tour-finance-mock"] },
	"tour-finance-mock": { name: "tour-finance.mock.ts" },
	schema: { name: "schema", children: ["finance-schema"] },
	"finance-schema": { name: "settings-finance-info.schema.ts" },
	constants: { name: "constants", children: ["tour-status-config"] },
	"tour-status-config": { name: "tour-status.config.ts" },
	shared: { name: "shared", children: ["ui", "hooks", "types-d"] },
	ui: { name: "ui", children: ["shadcn-ui", "custom"] },
	"shadcn-ui": { name: "shadcn-ui", children: ["button"] },
	button: { name: "Button.tsx" },
	custom: { name: "custom", children: ["input"] },
	input: { name: "Input.tsx" },
	hooks: { name: "hooks", children: ["use-auth"] },
	"use-auth": { name: "useAuth.tsx" },
	"types-d": { name: "api.d.ts" },
	configs: { name: "tailwind.config.ts" }
};
