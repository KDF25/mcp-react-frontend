export const ZOD_SCHEMA_CODE = `import { z } from "zod";
import { type TEntityPageKeys, i18nKey } from "@/shared/config";
// прямой путь к form.types — не barrel "../types" (нет цикла schema ↔ types)
import { ENUM_FORM_ENTITY_CREATE } from "../types/entity-name-create-form.types";

const msg = i18nKey<TEntityPageKeys>();
const F = ENUM_FORM_ENTITY_CREATE;

/** Runtime only — never export inferred types from schema files.
 *  Одна схема на операцию: update — в entity-name-update.schema.ts */
export const ENTITY_CREATE_SCHEMA = z.object({
	[F.DESCRIPTION]: z
		.string()
		.trim()
		.min(1, {
			message: msg("form.overview.fields.description.errors.required")
		})
		.min(3, {
			message: msg("form.overview.fields.description.errors.min")
		})
		.max(5000, {
			message: msg("form.overview.fields.description.errors.max")
		}),
});`;

export const ZOD_TYPES_CODE = `import type { FieldValues } from "react-hook-form";
import { z } from "zod";
// только import type — в рантайме зависимость schema → form.types односторонняя
import type { ENTITY_CREATE_SCHEMA } from "../schema";

export const ENUM_FORM_ENTITY_CREATE = {
	DESCRIPTION: "description",
} as const;

export type ENUM_FORM_ENTITY_CREATE_TYPE =
	(typeof ENUM_FORM_ENTITY_CREATE)[keyof typeof ENUM_FORM_ENTITY_CREATE];

/** z.infer and form enums live in types/ — пара к entity-name-create.schema.ts */
export type TEntityCreateSchema = z.infer<typeof ENTITY_CREATE_SCHEMA> &
	FieldValues;`;

export const ZOD_USAGE_CODE = `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	type TEntityCreateSchema,
	ENTITY_CREATE_SCHEMA,
} from "@/entities/entity-name";

const form = useForm<TEntityCreateSchema>({
    resolver: zodResolver(ENTITY_CREATE_SCHEMA),
    mode: "onSubmit"
});`;
