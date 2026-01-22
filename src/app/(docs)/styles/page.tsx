import { RulesProvider } from "@/entities/rules/lib/rules-provider";
import { ENUM_ROUTES } from "@/shared/config/routes";
import { STYLES_EXAMPLES } from "@/shared/config/docs/styles-examples";
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
    CardDescription,
    CardHeader,
    CardTitle,
    CodeBlock,
    Separator,
    SidebarTrigger,
} from "@/shared/ui";

export default function StylesPage() {
    const rules = RulesProvider.getRules();
    const styles = rules.styles;
    const patterns = rules.patterns;

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
                                <BreadcrumbPage>Styles & Patterns</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">Styling & Global Patterns</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Design system orchestration and architectural state management patterns.
                    </p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">01</span>
                            Tailwind Restrictions
                        </h2>
                        
                        <Card className="border-destructive/10">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Forbidden Palettes</CardTitle>
                                <CardDescription className="text-destructive/80 font-bold uppercase text-[10px] tracking-widest">🚨 Absolute Restriction</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {styles.forbiddenColors.map(color => (
                                        <div key={color} className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-border grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed group">
                                            <div className="w-4 h-4 rounded-sm bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
                                            <span className="text-xs font-mono uppercase tracking-tighter group-hover:text-destructive">{color}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 rounded-md bg-destructive/5 border border-destructive/10 text-[11px] text-destructive/80 leading-tight italic">
                                    LLM will automatically substitute forbidden colors with project-approved semantic tokens (e.g. primary, secondary, muted).
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">02</span>
                            State Management Contract
                        </h2>
                        
                        <div className="grid sm:grid-cols-3 gap-4">
                            {[
                                { title: "Server State", value: patterns.stateManagement.server, desc: "Global async data" },
                                { title: "Client State", value: patterns.stateManagement.client, desc: "Shared UI state" },
                                { title: "Local State", value: patterns.stateManagement.local, desc: "Component isolated" }
                            ].map(item => (
                                <Card key={item.title} className="bg-muted/30 border-none">
                                    <CardHeader className="py-3 px-4">
                                        <CardTitle className="text-xs font-bold uppercase text-muted-foreground">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-4 pb-4 space-y-1">
                                        <div className="text-lg font-bold tracking-tight">{item.value}</div>
                                        <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">03</span>
                            Data Fetching Implementation
                        </h2>
                        
                        <Card className="border-l-4 border-l-primary">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    RTK Query Pattern
                                    <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary">Standard</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground leading-relaxed italic">
                                    "{patterns.dataFetching.description}"
                                </p>
                        <CodeBlock 
                            filename="src/entities/user/api/user-api.ts"
                            language="typescript"
                            code={STYLES_EXAMPLES.rtkQuery}
                        />
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </main>
        </>
    )
}
