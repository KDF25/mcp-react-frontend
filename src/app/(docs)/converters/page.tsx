// import dynamic from "next/dynamic";
import { Converters } from "@/widgets/converters";

// const ConvertersDocs = dynamic(
// 	() => import("@/widgets/converters").then((m) => m.ConvertersWidget),
// 	{ ssr: false }
// );

export default function Page() {
	return <Converters />;
}
