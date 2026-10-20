import { ITreeItemData } from "@/shared/ui";

export const ZOD_TREE_ITEMS: Record<string, ITreeItemData> = {
	root: { name: "src/", children: ["entities", "widgets"] },
	entities: { name: "entities/", children: ["entity-name"] },
	"entity-name": { name: "[entity-name]/", children: ["schema", "types"] },
	schema: {
		name: "schema/",
		children: ["schema-create", "schema-update", "schema-index"]
	},
	"schema-create": { name: "[entity-name]-create.schema.ts" },
	"schema-update": { name: "[entity-name]-update.schema.ts" },
	"schema-index": { name: "index.ts" },
	types: {
		name: "types/",
		children: ["types-form-create", "types-form-update", "types-index"]
	},
	"types-form-create": { name: "[entity-name]-create-form.types.ts" },
	"types-form-update": { name: "[entity-name]-update-form.types.ts" },
	"types-index": { name: "index.ts" },
	widgets: { name: "widgets/", children: ["entity-widget"] },
	"entity-widget": { name: "[entity-name]/", children: ["ui"] },
	ui: { name: "ui/", children: ["ui-file"] },
	"ui-file": { name: "[entity-name].tsx" }
};
