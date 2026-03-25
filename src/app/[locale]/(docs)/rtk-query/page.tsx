import type { Metadata } from "next";

import { RtkQuery } from "@/widgets/rtk-query";

export const metadata: Metadata = {
	title: "RTK Query",
	description:
		"RTK Query data fetching patterns: semantic data renaming, loading states, error handling with toast notifications"
};

export default function Page() {
	return <RtkQuery />;
}
