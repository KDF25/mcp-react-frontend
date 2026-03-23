import dynamic from "next/dynamic";

const Creator = dynamic(() =>
	import("@/widgets/creator").then((m) => m.Creator)
);

export default function Page() {
	return <Creator />;
}
