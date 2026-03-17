import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/shared/config/i18n";
import {
	AppSidebar,
	DocHeader,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

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
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SidebarProvider>
					<AppSidebar />
					<SidebarInset>
						<DocHeader />
						<main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in duration-500">
							{children}
						</main>
					</SidebarInset>
				</SidebarProvider>
			</body>
		</html>
	);
}
