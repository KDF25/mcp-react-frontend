import { ITreeItemData } from "@/shared/ui";

export const API_TREE_ITEMS: Record<string, ITreeItemData> = {
	root: { name: "src/", children: ["shared", "entities"] },
	shared: { name: "shared/", children: ["shared-api"] },
	"shared-api": { name: "api/", children: ["shared-api-backend"] },
	"shared-api-backend": {
		name: "backend/",
		children: ["tags", "base-api", "session-expired", "shared-api-index"]
	},
	tags: { name: "tags.config.ts" },
	"base-api": { name: "base.api.ts" },
	"session-expired": { name: "session-expired.action.ts" },
	"shared-api-index": { name: "index.ts" },
	entities: { name: "entities/", children: ["entity-name"] },
	"entity-name": { name: "[entity-name]/", children: ["entity-api-folder"] },
	"entity-api-folder": {
		name: "api/",
		children: ["entity-service", "entity-api-index"]
	},
	"entity-service": { name: "[entity-name].service.ts" },
	"entity-api-index": { name: "index.ts" }
};
