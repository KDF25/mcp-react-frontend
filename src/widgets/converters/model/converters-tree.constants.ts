import { ITreeItemData } from "@/shared/ui";

export const CONVERTERS_TREE_ITEMS: Record<string, ITreeItemData> = {
	root: { name: "src/", children: ["entities"] },
	entities: { name: "entities/", children: ["entity-name"] },
	"entity-name": {
		name: "[entity-name]/",
		children: ["api", "converters", "types", "index-entity"]
	},
	api: { name: "api/", children: ["api-service", "api-index"] },
	"api-service": { name: "[entity-name].service.ts" },
	"api-index": { name: "index.ts" },
	converters: { name: "converters/", children: ["conv-file", "conv-index"] },
	"conv-file": { name: "[entity-name].converters.ts" },
	"conv-index": { name: "index.ts" },
	types: {
		name: "types/",
		children: ["types-backend", "types-frontend", "types-index"]
	},
	"types-backend": { name: "[entity-name].backend.interface.ts" },
	"types-frontend": { name: "[entity-name].interface.ts" },
	"types-index": { name: "index.ts" },
	"index-entity": { name: "index.ts" }
};
