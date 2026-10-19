import { ITreeItemData } from "@/shared/ui";

/** Vite SPA — public/locales + react-i18next */
export const I18N_TREE_ITEMS_VITE: Record<string, ITreeItemData> = {
	root: {
		name: "project/",
		children: ["src-root", "public-locales"]
	},
	"src-root": {
		name: "src/",
		children: ["shared-config"]
	},
	"shared-config": {
		name: "shared/config/",
		children: ["i18n-folder"]
	},
	"i18n-folder": {
		name: "i18n/",
		children: [
			"i18n-key",
			"i18n-types",
			"i18n-config",
			"i18n-blocks",
			"i18n-init",
			"i18n-checker",
			"i18n-switching"
		]
	},
	"i18n-key": { name: "i18n-key.ts" },
	"i18n-types": { name: "i18n.types.ts" },
	"i18n-config": { name: "i18n.config.ts" },
	"i18n-blocks": { name: "i18n.blocks.ts" },
	"i18n-init": { name: "i18n.init.ts" },
	"i18n-checker": { name: "i18n.checker.ts" },
	"i18n-switching": { name: "change-language.ts" },
	"public-locales": {
		name: "public/locales/",
		children: ["lang-en", "lang-ru"]
	},
	"lang-en": { name: "en/", children: ["common-en", "booking-en"] },
	"common-en": { name: "common.json" },
	"booking-en": { name: "booking/", children: ["order-en"] },
	"order-en": { name: "order.json" },
	"lang-ru": { name: "ru/", children: ["common-ru", "booking-ru"] },
	"common-ru": { name: "common.json" },
	"booking-ru": { name: "booking/", children: ["order-ru"] },
	"order-ru": { name: "order.json" }
};

/** Next.js App Router — messages/ + next-intl */
export const I18N_TREE_ITEMS_NEXT: Record<string, ITreeItemData> = {
	root: {
		name: "project/",
		children: ["src-root", "messages-root"]
	},
	"src-root": {
		name: "src/",
		children: ["shared-config", "shared-i18n"]
	},
	"shared-config": {
		name: "shared/config/",
		children: ["i18n-folder"]
	},
	"i18n-folder": {
		name: "i18n/",
		children: ["i18n-key", "i18n-types", "i18n-config", "i18n-checker"]
	},
	"i18n-key": { name: "i18n-key.ts" },
	"i18n-types": { name: "i18n.types.ts" },
	"i18n-config": { name: "i18n.config.ts" },
	"i18n-checker": { name: "i18n.checker.ts" },
	"shared-i18n": {
		name: "shared/i18n/",
		children: ["request-ts", "routing-ts"]
	},
	"request-ts": { name: "request.ts" },
	"routing-ts": { name: "routing.ts" },
	"messages-root": {
		name: "messages/",
		children: ["msg-en", "msg-ru"]
	},
	"msg-en": { name: "en/", children: ["msg-common-en", "msg-auth-en"] },
	"msg-common-en": { name: "common.json" },
	"msg-auth-en": { name: "auth.json" },
	"msg-ru": { name: "ru/", children: ["msg-common-ru", "msg-auth-ru"] },
	"msg-common-ru": { name: "common.json" },
	"msg-auth-ru": { name: "auth.json" }
};
