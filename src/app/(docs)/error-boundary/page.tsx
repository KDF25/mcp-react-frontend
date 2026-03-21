import dynamic from "next/dynamic";

const ErrorBoundary = dynamic(() =>
	import("@/widgets/error-boundary").then((m) => m.ErrorBoundary)
);

export default function Page() {
	return <ErrorBoundary />;
}
