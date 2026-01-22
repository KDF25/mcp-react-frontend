"use client"

import { DASHBOARD_CONTENT } from "@/shared/config/docs/landing-examples"
import {
  AppSidebar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/shared/ui"
import { Activity, ArrowRight, Layers, Radio, ShieldCheck, Type, Zap } from "lucide-react"
import Link from "next/link"

const ICON_MAP = {
    ShieldCheck: ShieldCheck,
    Layers: Layers,
    Type: Type
};

export default function Page() {
    const { hero, status, features, infrastructure } = DASHBOARD_CONTENT;

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-8 p-8 max-w-6xl mx-auto animate-in fade-in duration-700">
                    {/* Hero Section */}
                    <section className="space-y-6">
                        <div className="space-y-2">
                           <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 animate-pulse uppercase tracking-wider font-mono text-[10px]">
                                <Radio size={12} className="mr-1" /> System Online
                           </Badge>
                           <h1 className="text-5xl font-black tracking-tighter lg:text-7xl">
                                {hero.title.split(' ')[0]} <span className="text-primary italic">{hero.title.split(' ')[1]}</span>
                           </h1>
                           <p className="text-2xl font-medium text-muted-foreground tracking-tight">
                                {hero.subtitle}
                           </p>
                        </div>
                        <p className="text-xl text-muted-foreground/80 leading-relaxed max-w-3xl">
                            {hero.description}
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg" className="gap-2 font-bold" asChild>
                                <Link href="/introduction">
                                    Explore Protocol <ArrowRight size={18} />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="font-bold" asChild>
                                <Link href="/creator">
                                    System Architect
                                </Link>
                            </Button>
                        </div>
                    </section>

                    {/* Status Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {status.map((item, i) => (
                            <Card key={i} className="bg-muted/30 border-none shadow-none">
                                <CardContent className="p-4 space-y-1">
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{item.label}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-mono font-bold">{item.value}</p>
                                        <Badge className="text-[9px] h-4 uppercase font-black bg-emerald-500/10 text-emerald-500 border-none">
                                            {item.status}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Separator className="bg-primary/5" />

                    {/* Core Modules */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Activity size={20} className="text-primary" />
                            <h2 className="text-2xl font-bold tracking-tight">Functional Modules</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {features.map((feature, i) => {
                                const Icon = ICON_MAP[feature.icon as keyof typeof ICON_MAP];
                                return (
                                    <Link href={feature.link} key={i}>
                                        <Card className="h-full border-primary/5 hover:border-primary/20 hover:bg-primary/[0.02] transition-all group cursor-pointer overflow-hidden relative">
                                            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Icon size={80} strokeWidth={1} />
                                            </div>
                                            <CardHeader>
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                                                    <Icon size={20} />
                                                </div>
                                                <CardTitle>{feature.title}</CardTitle>
                                                <CardDescription className="leading-normal">
                                                    {feature.description}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* Infrastructure Logic */}
                    <section className="grid md:grid-cols-3 gap-8 pt-4">
                        {infrastructure.map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Zap size={16} className="text-primary/60" />
                                    <h3 className="font-bold tracking-tight">{item.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </section>

                    <footer className="pt-8 pb-4 border-t border-primary/5">
                        <p className="text-[10px] font-mono text-muted-foreground text-center uppercase tracking-[0.2em]">
                            Authorized Access Only — Architectural Integrity Layer v1.0.0
                        </p>
                    </footer>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
