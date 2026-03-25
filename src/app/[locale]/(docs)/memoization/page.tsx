import type { Metadata } from "next";

import { Memoization } from "@/widgets/memoization";

export const metadata: Metadata = {
	title: "Memoization",
	description:
		"React memoization strategies: useMemo, useCallback, and React.memo patterns for performance optimization"
};

export default function Page() {
	return <Memoization />;
}
