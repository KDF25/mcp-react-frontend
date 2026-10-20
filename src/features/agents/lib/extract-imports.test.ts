import { describe, expect, it } from "vitest";

import { extractImports, extractTypeDeclarations } from "./extract-imports";

describe("extractImports", () => {
	it("collects imports, type imports, side-effect imports and re-exports", () => {
		const content = `
import { useState } from "react";
import type { IOrder } from "@/entities/order";
import "./styles.css";
export * from "./ui";
export { mapOrderToFrontend } from "../converters";
export const LOCAL = 1;
`;

		expect(
			extractImports("src/widgets/orders/ui/orders.tsx", content)
		).toEqual([
			"react",
			"@/entities/order",
			"./styles.css",
			"./ui",
			"../converters"
		]);
	});

	it("collects declared interfaces and type aliases from the AST only", () => {
		const content = `
/** type Commented = 1; interface InComment {} */
const text = "type InString = 2";
export interface IOrder { id: string }
export type TOrderBackend = { id: string };
namespace Nested { type TInner = string; }
`;

		expect(extractTypeDeclarations("order.ts", content)).toEqual({
			interfaces: ["IOrder"],
			typeAliases: ["TOrderBackend", "TInner"]
		});
	});

	it("returns an empty list when there are no imports", () => {
		expect(extractImports("a.ts", "export const A = 1;")).toEqual([]);
	});
});
