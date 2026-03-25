export const ZOD_SCHEMA_CODE = `import { z } from "zod";
import { type TEntityPageKeys, i18nKey } from "@/shared/config";
import { ENUM_FORM_ENTITY } from "../types";

const msg = i18nKey<TEntityPageKeys>();

export const ENTITY_SCHEMA = z.object({
	[ENUM_FORM_ENTITY.DESCRIPTION]: z
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

export const ZOD_TYPES_CODE = `import { z } from "zod";
import type { ENTITY_SCHEMA } from "../schema";

export const ENUM_FORM_ENTITY = {
	DESCRIPTION: "description",
} as const;

export type TEntitySchema = z.infer<typeof ENTITY_SCHEMA>;`;

export const ZOD_USAGE_CODE = `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TEntitySchema, ENTITY_SCHEMA } from "@/entities/entity-name";

const form = useForm<TEntitySchema>({
    resolver: zodResolver(ENTITY_SCHEMA),
    mode: "onSubmit"
});`;
