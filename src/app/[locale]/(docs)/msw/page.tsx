import dynamic from "next/dynamic";

const Msw = dynamic(() => import("@/widgets/msw").then((m) => m.Msw));

export default function MswPage() {
	return <Msw />;
}
