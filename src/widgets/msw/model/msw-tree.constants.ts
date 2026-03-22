import { ITreeItemData } from "@/shared/ui";

export const MSW_TREE_ITEMS: Record<string, ITreeItemData> = {
	root: {
		name: "src/",
		children: ["app", "entities", "shared", "env-file", "main-file"]
	},
	app: { name: "app/", children: ["init"] },
	init: { name: "init/", children: ["msw-init-file"] },
	"msw-init-file": { name: "msw.ts" },
	entities: { name: "entities/", children: ["entity-name"] },
	"entity-name": { name: "[entity-name]/", children: ["handlers", "mock"] },
	handlers: { name: "handlers/", children: ["h-file", "h-index"] },
	"h-file": { name: "[entity-name].handlers.ts" },
	"h-index": { name: "index.ts" },
	mock: { name: "mock/", children: ["m-file", "m-index"] },
	"m-file": { name: "[entity-name].mock.ts" },
	"m-index": { name: "index.ts" },
	shared: { name: "shared/", children: ["s-api"] },
	"s-api": { name: "api/", children: ["s-msw"] },
	"s-msw": { name: "msw/", children: ["browser-file", "handlers-file"] },
	"browser-file": { name: "browser.ts" },
	"handlers-file": { name: "handlers.ts" },
	"env-file": { name: ".env" },
	"main-file": { name: "src/main.tsx" }
};
