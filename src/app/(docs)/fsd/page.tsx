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
    CardHeader,
    CardTitle,
    Badge,
    CodeBlock
} from "@/shared/ui"
import { RulesProvider } from "@/entities/rules/lib/rules-provider"
import { ENUM_ROUTES } from "@/shared/config/routes"
import { FSD_EXAMPLES } from "@/shared/config/docs/fsd-examples"

export default function FsdPage() {
    const fsd = RulesProvider.getFsdRules();

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
                                <BreadcrumbPage>Architecture (FSD)</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">Feature-Sliced Design Rules</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Establishing strict layer hierarchy and dependency boundaries to ensure horizontal and vertical decoupling.
                    </p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">01</span>
                            Layer Hierarchy
                        </h2>
                        <Card className="bg-muted/30 border-dashed">
                            <CardContent className="pt-6">
                                <div className="flex flex-col gap-3">
                                    {fsd.layers.map((layer, index) => (
                                        <div key={layer} className="flex items-center gap-4">
                                            <div className="w-28 flex justify-center">
                                                <Badge variant={index === 0 ? "default" : "secondary"} className="w-full justify-center font-mono py-1">
                                                    {layer}
                                                </Badge>
                                            </div>
                                            <div className="flex-1 h-[1px] bg-border" />
                                            {index < fsd.layers.length - 1 && (
                                                <div className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap px-4 bg-background">
                                                    Can use ↓
                                                </div>
                                            )}
                                            {index === fsd.layers.length - 1 && (
                                                <div className="text-[10px] font-bold text-primary uppercase whitespace-nowrap px-4 bg-background">
                                                    Foundation
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section id="boundaries">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">02</span>
                            Import Boundaries
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {fsd.boundaries.map((boundary) => (
                                <Card key={boundary.from} className="bg-card/40 hover:bg-card/60 transition-colors">
                                    <CardHeader className="py-4">
                                        <CardTitle className="text-sm font-mono flex items-center gap-2">
                                            <Badge variant="outline" className="text-primary border-primary/20">{boundary.from}</Badge>
                                            <span className="text-xs text-muted-foreground">accesses:</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pb-4 pt-0">
                                        <div className="flex flex-wrap gap-1.5">
                                            {boundary.allow.map(target => (
                                                <Badge key={target} variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
                                                    {target}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                         <h2 className="text-2xl font-semibold flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">03</span>
                            Practical Examples
                        </h2>
                        
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Badge variant="outline" className="text-primary border-primary/20 gap-2 mb-2">
                                    ✅ Valid Import
                                </Badge>
                                <CodeBlock 
                                    filename="src/features/auth/ui/login-form.tsx"
                                    language="typescript"
                                    code={FSD_EXAMPLES.validImport}
                                />
                            </div>

                            <div className="space-y-2">
                                <Badge variant="outline" className="text-destructive border-destructive/20 gap-2 mb-2">
                                    ❌ Forbidden Violation
                                </Badge>
                                <CodeBlock 
                                    filename="src/entities/user/model/user.ts"
                                    language="typescript"
                                    code={FSD_EXAMPLES.forbiddenViolation}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 font-mono">
                             <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">04</span>
                             Global Settings
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {Object.entries(fsd.rules).map(([rule, active]) => (
                                <div key={rule} className="flex items-center justify-between p-3 rounded-xl border bg-card/10 border-primary/10">
                                    <span className="font-mono text-xs text-muted-foreground">{rule}</span>
                                    <Badge variant={active ? "default" : "destructive"} className="text-[9px] h-4 uppercase">
                                        {active ? 'Enforced' : 'Off'}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
