import dynamic from "next/dynamic";

const Fsd = dynamic(() => import("@/widgets/fsd").then((m) => m.Fsd));

export default function Page() {
	return <Fsd />;
}
