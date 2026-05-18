import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import {
	getMessages,
	getTranslations,
	setRequestLocale
} from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";

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

	return {
		metadataBase: new URL(baseUrl),
		title: {
			default: title,
			template: `%s | ${title}`
		},
		description,
		keywords: ["MCP", "React", "FSD", "Linter", "Orchestration", "Server"],
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
				{/* Google Tag Manager */}
				<Script id="gtm" strategy="afterInteractive">
					{`
						(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;
						f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','GTM-P5PZXHFR');
					`}
				</Script>

				{/* Google Tag Manager (noscript) */}
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-P5PZXHFR"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					/>
				</noscript>
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
