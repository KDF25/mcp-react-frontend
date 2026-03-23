"use client";

import { Loader } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { FC, useTransition } from "react";

import { ENUM_LANGUAGES, LANGUAGES_LIST } from "@/shared/config";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/shared/ui";

import { usePathname, useRouter } from "@/i18n/routing";

export const LanguageToggle: FC = () => {
	const locale = useLocale();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const params = useParams();

	function onSelectChange(nextLocale: string) {
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: nextLocale as ENUM_LANGUAGES }
			);
		});
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm">
					{isPending ? (
						<Loader size={12} className="animate-spin" />
					) : (
						locale?.toUpperCase()
					)}
					<span className="sr-only">Toggle language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{LANGUAGES_LIST.map((lang) => (
					<DropdownMenuItem
						key={lang.value}
						onClick={() => onSelectChange(lang.value)}
					>
						{lang.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
