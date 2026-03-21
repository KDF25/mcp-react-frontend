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

import "./globals.css";

export const metadata: Metadata = {
	title: "MCP Orchestrator",
	description: "FSD & Linter Orchestration Server"
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
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>
						<DocHeader />
						<main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in duration-500">
							<ErrorBoundary>{children}</ErrorBoundary>
						</main>
					</SidebarInset>
				</SidebarProvider>
			</body>
		</html>
	);
}
