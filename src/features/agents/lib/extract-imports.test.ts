import { describe, expect, it } from "vitest";

import { extractImports } from "./extract-imports";

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

	it("returns an empty list when there are no imports", () => {
		expect(extractImports("a.ts", "export const A = 1;")).toEqual([]);
	});
});
