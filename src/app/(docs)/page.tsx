import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Separator,
    SidebarTrigger,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Badge,
    CodeBlock,
} from "@/shared/ui"

import { ENUM_ROUTES } from "@/shared/config/routes"
import { INTRODUCTION_EXAMPLES } from "@/shared/config/docs/introduction-examples"

export default function DocsPage() {
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href={ENUM_ROUTES.MAIN.ROOT}>
                                    Documentation
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>The Mission</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in duration-500">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">Orchestrator v1</Badge>
                        <Badge variant="secondary">Architectural Hub</Badge>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        The <span className="text-primary italic">Mission</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Establishing a definitive source of truth for architectural contracts, 
                        eliminating entropy, and enforcing strict project orchestration.
                    </p>
                </div>

                <div className="grid gap-6">
                    <Card className="border-primary/10 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">The Mission</CardTitle>
                            <CardDescription>Why this server exists</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                This MCP server acts as an <strong>Automated Architect</strong>. It provides LLMs with a 
                                crystal-clear understanding of how to modify, validate, and extend this specific codebase 
                                without violating its core principles.
                            </p>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Card className="hover:border-primary/20 transition-colors cursor-default">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Architectural Integrity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Strict <Badge variant="outline" className="text-[10px] py-0">FSD</Badge> enforcement. 
                                    Ensures modules remain decoupled and layers are correctly bounded.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="hover:border-primary/20 transition-colors cursor-default">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Predictable Quality</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Semantic naming and strict linting. Eliminates common mistakes 
                                    before they reach the review stage.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="rounded-lg border bg-primary/5 p-6 border-primary/20">
                    <h3 className="text-lg font-bold mb-2">Zero-Tolerance Policy</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Any modification that violates the established contracts will be rejected by the orchestrator. 
                        We prioritize long-term maintainability over short-term speed.
                    </p>
                </div>
            </main>
        </>
    )
}
