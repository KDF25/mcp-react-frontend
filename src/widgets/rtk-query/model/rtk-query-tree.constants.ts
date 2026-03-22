import { ITreeItemData } from "@/shared/ui";

export const API_TREE_ITEMS: Record<string, ITreeItemData> = {
	root: { name: "src/", children: ["shared", "entities"] },
	shared: { name: "shared/", children: ["shared-api"] },
	"shared-api": { name: "api/", children: ["shared-api-backend"] },
	"shared-api-backend": {
		name: "backend/",
		children: ["tags", "base-api", "shared-api-index"]
	},
	tags: { name: "tags.config.ts" },
	"base-api": { name: "base.api.ts" },
	"shared-api-index": { name: "index.ts" },
	entities: { name: "entities/", children: ["auth", "entity-name"] },
	auth: { name: "auth/", children: ["auth-api-folder"] },
	"auth-api-folder": {
		name: "api/",
		children: ["auth-query", "auth-api", "auth-api-index"]
	},
	"auth-query": { name: "auth-base-query.ts" },
	"auth-api": { name: "auth.api.ts" },
	"auth-api-index": { name: "index.ts" },
	"entity-name": { name: "[entity-name]/", children: ["entity-api-folder"] },
	"entity-api-folder": {
		name: "api/",
		children: ["entity-service", "entity-api-index"]
	},
	"entity-service": { name: "[entity-name].service.ts" },
	"entity-api-index": { name: "index.ts" }
};
