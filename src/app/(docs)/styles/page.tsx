import dynamic from "next/dynamic";

const Styles = dynamic(() => import("@/widgets/styles").then((m) => m.Styles));

export default function Page() {
	return <Styles />;
}
