import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

export default function NotFound() {
	const t = useTranslations("not_found");

	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-6 py-20">
			<h1 className="text-6xl font-bold tracking-tight text-foreground">
				404
			</h1>
			<p className="text-lg text-muted-foreground">{t("description")}</p>
			<Link
				href="/"
				className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
			>
				{t("backHome")}
			</Link>
		</div>
	);
}
