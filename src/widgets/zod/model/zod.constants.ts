export const ZOD_SCHEMA_CODE = `import { z } from "zod";
import { type TEntityPageKeys, i18nKey } from "@/shared/config";
import { ENUM_FORM_ENTITY_CREATE } from "../types";

const msg = i18nKey<TEntityPageKeys>();
const F = ENUM_FORM_ENTITY_CREATE;

/** Runtime only — never export inferred types from schema files */
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
});

export const ENTITY_UPDATE_SCHEMA = z.object({
	[F.DESCRIPTION]: z
		.string()
		.trim()
		.min(1, {
			message: msg("form.overview.fields.description.errors.required")
		}),
});`;

export const ZOD_TYPES_CODE = `import type { FieldValues } from "react-hook-form";
import { z } from "zod";
import type {
	ENTITY_CREATE_SCHEMA,
	ENTITY_UPDATE_SCHEMA,
} from "../schema";

export const ENUM_FORM_ENTITY_CREATE = {
	DESCRIPTION: "description",
} as const;

/** z.infer and form enums live in types/ */
export type TEntityCreateSchema = z.infer<typeof ENTITY_CREATE_SCHEMA> &
	FieldValues;

export type TEntityUpdateSchema = z.infer<typeof ENTITY_UPDATE_SCHEMA> &
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
