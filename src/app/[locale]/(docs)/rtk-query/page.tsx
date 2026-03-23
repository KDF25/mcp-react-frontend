import dynamic from "next/dynamic";

const RtkQuery = dynamic(() =>
	import("@/widgets/rtk-query").then((m) => m.RtkQuery)
);

export default function Page() {
	return <RtkQuery />;
}
