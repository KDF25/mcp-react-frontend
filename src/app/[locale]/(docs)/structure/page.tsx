import dynamic from "next/dynamic";

const Structure = dynamic(() =>
	import("@/widgets/structure").then((m) => m.Structure)
);

export default function Page() {
	return <Structure />;
}
