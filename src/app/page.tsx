"use client";

import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/widgets/home").then((m) => m.Home));

export default function Page() {
	return <Home />;
}
