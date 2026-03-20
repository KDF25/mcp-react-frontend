import dynamic from "next/dynamic";

const Memoization = dynamic(() =>
	import("@/widgets/memoization").then((m) => m.Memoization)
);

export default function Page() {
	return <Memoization />;
}
