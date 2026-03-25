import { ITreeItemData } from "@/shared/ui";

export const ZOD_TREE_ITEMS: Record<string, ITreeItemData> = {
	root: { name: "src/", children: ["entities", "widgets"] },
	entities: { name: "entities/", children: ["entity-name"] },
	"entity-name": { name: "[entity-name]/", children: ["schema", "types"] },
	schema: { name: "schema/", children: ["schema-file"] },
	"schema-file": { name: "[entity-name].schema.ts" },
	types: { name: "types/", children: ["types-file"] },
	"types-file": { name: "[entity-name].types.ts" },
	widgets: { name: "widgets/", children: ["entity-widget"] },
	"entity-widget": { name: "[entity-name]/", children: ["ui"] },
	ui: { name: "ui/", children: ["ui-file"] },
	"ui-file": { name: "[entity-name].tsx" }
};
