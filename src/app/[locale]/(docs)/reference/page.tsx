import dynamic from "next/dynamic";

const Reference = dynamic(() =>
	import("@/widgets/reference").then((m) => m.Reference)
);

export default function Page() {
	return <Reference />;
}
