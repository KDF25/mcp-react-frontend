import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "@/shared/config/i18n";
import {
	DocHeader,
	ErrorBoundary,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

import { AppSidebar } from "@/widgets/sidebar";

import { ThemeProvider } from "@/app/providers/theme";

import "./globals.css";

const title = "MCP Orchestrator";
const description = "FSD & Linter Orchestration Server";

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
	),
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

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
			>
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
			</body>
		</html>
	);
}
