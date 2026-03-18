import dynamic from "next/dynamic";

const Zod = dynamic(() => import("@/widgets/zod").then((m) => m.Zod));

export default function Page() {
	return <Zod />;
}
