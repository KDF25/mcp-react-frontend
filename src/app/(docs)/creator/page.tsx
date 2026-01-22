"use client"

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
    CodeBlock,
    Button
} from "@/shared/ui"
import { ENUM_ROUTES } from "@/shared/config/routes"
import { CREATOR_EXAMPLES } from "@/shared/config/docs/creator-examples"
import { Github, Mail, ShieldCheck } from "lucide-react"

export default function CreatorPage() {
    const profile = CREATOR_EXAMPLES.profile;

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
                                <BreadcrumbPage>Creator</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in duration-500">
                <section className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Creator</h1>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">System Architect</Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <ShieldCheck size={12} /> Lead Orchestrator
                        </Badge>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Role</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {profile.role}
                    </p>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Responsibility</h2>
                    <ul className="grid gap-3">
                        {profile.responsibility.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-[10px] font-bold">{i + 1}</span>
                                <span className="text-sm font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Engineering Principles</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {profile.engineeringPrinciples.map((item, i) => (
                            <Card key={i} className="border-none shadow-none bg-muted/50">
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-xs font-black uppercase tracking-widest text-primary/80">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="text-xs text-muted-foreground leading-normal">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Technical Identification</h2>
                    <CodeBlock 
                        filename="creator_registry.json"
                        language="json"
                        code={CREATOR_EXAMPLES.technicalContract}
                    />
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">Connections</h2>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild className="gap-2">
                            <a href={profile.connections.github} target="_blank" rel="noopener noreferrer">
                                <Github size={16} /> GitHub Registry
                            </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="gap-2">
                            <a href={`mailto:${profile.connections.email}`}>
                                <Mail size={16} /> Direct Endpoint
                            </a>
                        </Button>
                    </div>
                </section>
                
                <div className="rounded-lg border bg-primary/5 p-4 border-primary/20 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-mono text-muted-foreground">Architect Status: {profile.status || "Authorized"}</span>
                     </div>
                     <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">"{profile.philosophy}"</span>
                </div>
            </main>
        </>
    )
}
