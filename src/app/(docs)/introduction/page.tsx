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
} from "@/shared/ui"

import { ENUM_ROUTES } from "@/shared/config/routes"
import { INTRODUCTION_EXAMPLES } from "@/shared/config/docs/introduction-examples"

export default function IntroductionPage() {
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
                                <BreadcrumbPage>Introduction</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in duration-500">
                <section className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Introduction</h1>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold tracking-tight">What is MCP</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {INTRODUCTION_EXAMPLES.whatIsMCP}
                        </p>
                    </div>
                </section>

                <Separator />

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">What MCP is NOT</h2>
                    <ul className="grid gap-3">
                        {INTRODUCTION_EXAMPLES.whatIsNOT.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive font-mono text-[10px] font-bold">!</span>
                                <span className="text-sm font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">MCP Role in Project Rewrite</h2>
                    <div className="relative space-y-4 pl-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-border">
                        {INTRODUCTION_EXAMPLES.rewriteRole.map((item, i) => (
                            <div key={i} className="relative space-y-1">
                                <div className="absolute -left-7 top-1.5 h-2 w-2 rounded-full border bg-background border-primary" />
                                <h3 className="font-bold text-sm tracking-tight">{item.step}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">MCP vs Prompts and Workflow Rules</h2>
                    <Card className="bg-primary/[0.02] border-primary/10">
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground leading-relaxed italic">
                                {INTRODUCTION_EXAMPLES.vsPrompts}
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight">Design Philosophy</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {INTRODUCTION_EXAMPLES.philosophy.map((item, i) => (
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
            </main>
        </>
    )
}
