import dynamic from "next/dynamic";

const Entities = dynamic(() =>
	import("@/widgets/entities").then((m) => m.Entities)
);

export default function Page() {
	return <Entities />;
}
