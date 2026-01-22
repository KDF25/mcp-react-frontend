import {
    AppSidebar,
    SidebarInset,
    SidebarProvider,
} from "@/shared/ui"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
