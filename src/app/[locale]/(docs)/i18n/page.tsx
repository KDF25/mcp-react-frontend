import dynamic from "next/dynamic";

const I18n = dynamic(() => import("@/widgets/i18n").then((m) => m.I18n));

export default function Page() {
	return <I18n />;
}
