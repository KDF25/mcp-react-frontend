import { describe, expect, it } from "vitest";

import { checkFilenameCase } from "./filename-case";

describe("checkFilenameCase", () => {
	it("allows kebab-case files", () => {
		expect(
			checkFilenameCase("src/widgets/order/ui/order-card.tsx")
		).toEqual([]);
	});

	it("allows semantic suffixes", () => {
		expect(
			checkFilenameCase("src/entities/order/api/order.service.ts")
		).toEqual([]);
		expect(
			checkFilenameCase(
				"src/entities/order/converters/order.converters.ts"
			)
		).toEqual([]);
		expect(
			checkFilenameCase(
				"src/entities/order/types/order-backend.interface.ts"
			)
		).toEqual([]);
	});

	it("allows React hooks", () => {
		expect(checkFilenameCase("src/shared/hooks/useAuth.ts")).toEqual([]);
	});

	it("allows Next.js entry files", () => {
		expect(checkFilenameCase("src/app/[locale]/page.tsx")).toEqual([]);
		expect(checkFilenameCase("src/app/layout.tsx")).toEqual([]);
	});

	it("rejects PascalCase component files without ignore", () => {
		const hits = checkFilenameCase("src/widgets/order/ui/OrderCard.tsx");
		expect(hits).toHaveLength(1);
		expect(hits[0]?.ruleId).toBe("filename-case");
	});
});
