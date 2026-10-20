import { describe, expect, it } from "vitest";

import { FORM_TYPES_CODE, SCHEMA_CODE } from "./entities-modules.constants";

describe("entities docs snippets", () => {
	it("follow the Zod pair rule (schema ↔ form.types, no barrel cycle)", () => {
		expect(SCHEMA_CODE).not.toMatch(/export type T\w+\s*=\s*z\.infer/);
		expect(SCHEMA_CODE).toMatch(
			/from "\.\.\/types\/[\w-]+-create-form\.types"/
		);
		expect(SCHEMA_CODE).not.toMatch(/from ["']\.\.\/types["']/);

		expect(FORM_TYPES_CODE).toMatch(/z\.infer/);
		expect(FORM_TYPES_CODE).toMatch(
			/import type \{[^}]+\} from "\.\.\/schema"/
		);
	});
});
