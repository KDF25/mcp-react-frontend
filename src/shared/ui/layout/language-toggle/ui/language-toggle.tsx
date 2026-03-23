import { GlobeIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { type FC, useId } from "react";

import { ENUM_LANGUAGES, LANGUAGES_LIST } from "@/shared/config";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/shared/ui";

import { usePathname, useRouter } from "@/i18n/routing";

export const LanguageToggle: FC = () => {
	const id = useId();
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Select
			defaultValue={locale || ENUM_LANGUAGES.EN}
			onValueChange={(value) => {
				router.replace(pathname, { locale: value as ENUM_LANGUAGES });
			}}
		>
			<SelectTrigger
				id={`language-${id}`}
				className="[&>svg]:text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground h-8 border-none shadow-none [&>svg]:shrink-0"
				aria-label="Select language"
			>
				<GlobeIcon size={16} aria-hidden="true" className="mr-2" />
				<SelectValue className="hidden sm:inline-flex" />
			</SelectTrigger>

			<SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
				{LANGUAGES_LIST.map((lang) => (
					<SelectItem key={lang.value} value={lang.value}>
						<span className="flex items-center gap-2">
							<span className="truncate">{lang.label}</span>
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
