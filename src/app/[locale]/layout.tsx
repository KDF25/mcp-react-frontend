import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import {
	getMessages,
	getTranslations,
	setRequestLocale
} from "next-intl/server";
import { notFound } from "next/navigation";

import {
	DocHeader,
	ErrorBoundary,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

import { AppSidebar } from "@/widgets/sidebar";

import { ThemeProvider } from "@/app/providers/theme";

import "./globals.css";
import { routing } from "@/i18n/routing";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, "children">) {
	const { locale } = await props.params;
	const t = await getTranslations({ locale, namespace: "home" });

	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
	const title = "MCP Orchestrator";
	const description = "FSD & Linter Orchestration Server";

	const alternateLanguages = Object.fromEntries(
		routing.locales.map((l) => [l, `${baseUrl}/${l}`])
	);

	return {
		metadataBase: new URL(baseUrl),
		title: {
			default: title,
			template: `%s | ${title}`
		},
		description,
		keywords: ["MCP", "React", "FSD", "Linter", "Orchestration", "Server"],
		alternates: {
			canonical: `${baseUrl}/${locale}`,
			languages: alternateLanguages
		},
		openGraph: {
			title,
			description,
			type: "website",
			siteName: title,
			locale,
			images: [
				{
					url: "/logo.png",
					width: 1200,
					height: 630,
					alt: title
				}
			]
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: ["/logo.png"]
		},
		icons: {
			icon: "/logo.png"
		}
	};
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	// Enable static rendering
	setRequestLocale(locale);

	// Load messages for the active locale
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
			>
				<NextIntlClientProvider messages={messages} locale={locale}>
					<ThemeProvider>
						<SidebarProvider>
							<AppSidebar />
							<SidebarInset>
								<DocHeader />
								<main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in duration-500">
									<ErrorBoundary>{children}</ErrorBoundary>
								</main>
							</SidebarInset>
						</SidebarProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
