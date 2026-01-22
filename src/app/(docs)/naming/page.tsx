import { RulesProvider } from "@/entities/rules/lib/rules-provider";
import { ENUM_ROUTES } from "@/shared/config/routes";
import { NAMING_EXAMPLES } from "@/shared/config/docs/naming-examples";
import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Card,
    CardContent,
    CardHeader,
    CodeBlock,
    Separator,
    SidebarTrigger
} from "@/shared/ui";

export default function NamingPage() {
    const naming = RulesProvider.getNamingRules();
    const linter = RulesProvider.getLinterRules();

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
                                <BreadcrumbPage>Coding Standards</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">Naming & Style Standards</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Strict semantic conventions designed to eliminate ambiguity and technical debt through static analysis.
                    </p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">Aa</span>
                            File Case & Prefixes
                        </h2>
                        
                        <div className="grid gap-6">
                            <Card className="bg-card">
                                <CardHeader className="pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Global File Policy
                                </CardHeader>
                                <CardContent className="flex items-center gap-4">
                                    <Badge variant="outline" className="text-lg font-mono py-1 px-4 border-primary/30 text-primary bg-primary/5">
                                        {naming.fileCase}
                                    </Badge>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-muted-foreground">Example:</span>
                                        <code className="text-sm font-bold">user-profile-card.tsx</code>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid sm:grid-cols-3 gap-4">
                                {Object.entries(naming.prefixes).map(([type, prefix]) => (
                                    <Card key={type} className="bg-muted/30 border-none shadow-none">
                                        <CardHeader className="py-3">
                                            <span className="text-[10px] font-bold uppercase text-muted-foreground">{type} prefix</span>
                                        </CardHeader>
                                        <CardContent className="pb-4 pt-0">
                                            <div className="text-2xl font-bold font-mono text-primary/80">{prefix}</div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="linter">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-destructive">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive font-mono text-sm font-bold">!</span>
                            Linter Prohibitions
                        </h2>
                        <div className="grid gap-3">
                            {Object.entries(linter).map(([rule, active]) => (
                                <Card key={rule} className="border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="space-y-1">
                                            <div className="font-mono text-sm font-bold text-destructive/80">{rule}</div>
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Static Block Enforcement</p>
                                        </div>
                                        <Badge variant="destructive" className="animate-pulse h-5 text-[9px]">Strict Prohibited</Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">#</span>
                            Syntax Guidance
                        </h2>
                        
                        <CodeBlock 
                            filename="Code Syntax Guidelines"
                            language="typescript"
                            code={NAMING_EXAMPLES.syntaxGuidance}
                        />
                    </section>
                </div>
            </main>
        </>
    )
}
