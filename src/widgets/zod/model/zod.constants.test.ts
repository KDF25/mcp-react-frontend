import { describe, expect, it } from "vitest";

import { ZOD_SCHEMA_CODE, ZOD_TYPES_CODE } from "./zod.constants";

describe("zod docs snippets", () => {
	it("match the same Zod placement rules as the rule doc and scaffold", () => {
		expect(ZOD_SCHEMA_CODE).not.toMatch(/export type T\w+\s*=\s*z\.infer/);
		expect(ZOD_SCHEMA_CODE).toMatch(
			/from "\.\.\/types\/[\w-]+-create-form\.types"/
		);
		expect(ZOD_SCHEMA_CODE).not.toMatch(/from ["']\.\.\/types["']/);

		expect(ZOD_TYPES_CODE).toMatch(/z\.infer/);
		expect(ZOD_TYPES_CODE).toContain("ENUM_FORM_ENTITY_CREATE");
		expect(ZOD_TYPES_CODE).toMatch(
			/import type \{[^}]+\} from "\.\.\/schema"/
		);
	});
});
