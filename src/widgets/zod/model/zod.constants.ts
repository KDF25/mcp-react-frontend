import { Item } from "./zod.types";

export const ZOD_STRUCTURE_ITEMS: Record<string, Item> = {
	root: { name: "src/entities/user", children: ["schema", "types"] },
	schema: { name: "schema", children: ["s_account"] },
	s_account: { name: "account.schema.ts" },
	types: { name: "types", children: ["t_account"] },
	t_account: { name: "account.types.ts" }
};

export const SCHEMA_CODE = `import { z } from "zod";
import { type TAccountSettingsPageKeys, i18nKey } from "@/shared/config";
import { ENUM_FORM_ACCOUNT } from "../types";

const msg = i18nKey<TAccountSettingsPageKeys>();

export const ACCOUNT_SCHEMA = z.object({
    [ENUM_FORM_ACCOUNT.LOGIN]: z
        .string()
        .min(1, { message: msg("form.personal.fields.login.errors.required") })
        .min(3, { message: msg("form.personal.fields.login.errors.min") }),
});`;

export const TYPES_CODE = `import type z from "zod";
import type { ACCOUNT_SCHEMA } from "../schema";

export const ENUM_FORM_ACCOUNT = {
    LOGIN: "login",
} as const;

export type TAccountSchema = z.infer<typeof ACCOUNT_SCHEMA>;`;
