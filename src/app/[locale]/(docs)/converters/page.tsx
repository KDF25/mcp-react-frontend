import dynamic from "next/dynamic";

const Converters = dynamic(() =>
	import("@/widgets/converters").then((m) => m.Converters)
);

export default function Page() {
	return <Converters />;
}
