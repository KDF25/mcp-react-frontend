import {
	AppSidebar,
	DocHeader,
	SidebarInset,
	SidebarProvider
} from "@/shared/ui";

export default function DocsLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<DocHeader />
				<main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in duration-500">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
