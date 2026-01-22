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
    CodeBlock
} from "@/shared/ui"
import { ENUM_ROUTES } from "@/shared/config/routes"
import { REFERENCE_EXAMPLES } from "@/shared/config/docs/reference-examples"

export default function ReferencePage() {
    const claudeConfig = REFERENCE_EXAMPLES.claudeConfig;

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
                                <BreadcrumbPage>API & Tools</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in duration-500">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">API Reference & Connection</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Technical specifications for tool integration and local environment synchronization.
                    </p>
                </div>

                <div className="space-y-12">
                    <section id="tools" className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">#</span>
                            Registered Tools
                        </h2>
                        
                        <div className="grid gap-4">
                            <Card className="border-primary/10 hover:border-primary/30 transition-all group">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary/[0.02]">
                                    <CardTitle className="font-mono text-lg font-bold text-primary group-hover:text-primary transition-colors">analyze_project</CardTitle>
                                    <Badge variant="outline" className="text-[10px] border-primary/20 text-primary uppercase">Core Logic</Badge>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-4">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Primary analysis engine. Validates file paths against FSD layer rules and naming conventions. 
                                        Returns a detailed JSON object of violations and recommendations.
                                    </p>
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Input Schema</h4>
                                        <CodeBlock 
                                            filename="Input Schema"
                                            language="json"
                                            code={REFERENCE_EXAMPLES.inputSchema}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-primary/10 group">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="font-mono text-lg font-bold text-primary group-hover:text-primary transition-colors">get_rules</CardTitle>
                                    <Badge variant="outline" className="text-[10px] border-primary/20 text-primary uppercase">Metadata</Badge>
                                </CardHeader>
                                <CardContent className="pt-2">
                                    <p className="text-sm text-muted-foreground italic">
                                        Fetches all dynamic rules from `RulesProvider`. Always use this to synchronize current LLM context with server state.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-3">
                             <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">CL</span>
                             Claude Desktop Connection
                        </h2>
                        <Card className="bg-muted/30 border-dashed">
                            <CardHeader>
                                <CardTitle className="text-sm">Local Synchronization Guide</CardTitle>
                                <CardDescription>Step-by-step connection for model orchestration</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-[11px] font-bold uppercase text-muted-foreground">1. Config Location (Windows)</h3>
                                    <Badge variant="secondary" className="font-mono text-[10px] w-full py-1 justify-start overflow-x-auto whitespace-pre">
                                        %APPDATA%\\Claude\\claude_desktop_config.json
                                    </Badge>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-[11px] font-bold uppercase text-muted-foreground">2. Configuration Snippet</h3>
                                    <CodeBlock 
                                        filename="claude_desktop_config.json"
                                        language="json"
                                        code={JSON.stringify(claudeConfig, null, 2)}
                                    />
                                    <p className="text-[10px] text-muted-foreground italic">
                                        Note: Restart Claude Desktop after saving the configuration.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="space-y-6 pb-12">
                        <h2 className="text-2xl font-semibold">REST API Transport</h2>
                        <div className="grid gap-3">
                            {[
                                { method: "GET", path: "/api/mcp", desc: "SSE Persistent connection (MCP Protocol)", variant: "default" },
                                { method: "POST", path: "/api/check-project", desc: "Batch validation report", variant: "outline" }
                            ].map(api => (
                                <Card key={api.path} className="border-none bg-muted/20 shadow-none hover:bg-muted/40 transition-all cursor-default group">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Badge variant={api.variant as any} className="font-black italic text-[9px]">
                                                {api.method}
                                            </Badge>
                                            <div className="space-y-0.5">
                                                <div className="font-mono text-sm font-bold tracking-tight group-hover:text-primary transition-colors">{api.path}</div>
                                                <p className="text-[10px] text-muted-foreground">{api.desc}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
