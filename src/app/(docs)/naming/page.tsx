import dynamic from "next/dynamic";

const Naming = dynamic(() => import("@/widgets/naming").then((m) => m.Naming));

export default function Page() {
	return <Naming />;
}
