import dynamic from "next/dynamic";

const Introduction = dynamic(() =>
	import("@/widgets/introduction").then((m) => m.Introduction)
);

export default function Page() {
	return <Introduction />;
}
