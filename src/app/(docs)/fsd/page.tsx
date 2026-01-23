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
    CodeBlock
} from "@/shared/ui"
import { RulesProvider } from "@/entities/rules/lib/rules-provider"
import { ENUM_ROUTES } from "@/shared/config/routes"
import { FSD_EXAMPLES } from "@/shared/config/docs/fsd-examples"
import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { Tree, TreeItem, TreeItemLabel } from "@/shared/ui/tree";

interface Item {
    name: string;
    children?: string[];
}

const entityStructureItems: Record<string, Item> = {
    root: { name: "src/entities/invoice", children: ["api", "types", "constants", "converters", "handlers", "mock", "ui", "index"] },
    api: { name: "api" },
    types: { name: "types", children: ["t_index", "t_interface", "t_types"] },
    t_index: { name: "index.ts" },
    t_interface: { name: "invoice.interface.ts" },
    t_types: { name: "invoice.types.ts" },
    constants: { name: "constants" },
    converters: { name: "converters" },
    handlers: { name: "handlers" },
    mock: { name: "mock" },
    ui: { name: "ui" },
    index: { name: "index.ts" },
};

const widgetStructureItems: Record<string, Item> = {
    root: { name: "src/widgets/accommodation-edit", children: ["model", "ui_folder", "main_file", "index_w"] },
    model: { name: "model", children: ["m_config", "m_schema", "m_types", "m_index"] },
    m_config: { name: "config" },
    m_schema: { name: "schema" },
    m_types: { name: "types" },
    m_index: { name: "index.ts" },
    ui_folder: { name: "ui", children: ["ui_general", "ui_rooms"] },
    ui_general: { name: "general-info" },
    ui_rooms: { name: "rooms" },
    main_file: { name: "accommodation-edit.tsx" },
    index_w: { name: "index.ts" },
};

export default function FsdPage() {
    const fsd = RulesProvider.getFsdRules();

    const entityTree = useTree<Item>({
        dataLoader: {
            getChildren: (itemId) => entityStructureItems[itemId].children ?? [],
            getItem: (itemId) => entityStructureItems[itemId],
        },
        features: [syncDataLoaderFeature, hotkeysCoreFeature],
        getItemName: (item) => item.getItemData().name,
        indent: 20,
        initialState: {
            expandedItems: ["root", "types"],
        },
        isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
        rootItemId: "root",
    });

    const widgetTree = useTree<Item>({
        dataLoader: {
            getChildren: (itemId) => widgetStructureItems[itemId].children ?? [],
            getItem: (itemId) => widgetStructureItems[itemId],
        },
        features: [syncDataLoaderFeature, hotkeysCoreFeature],
        getItemName: (item) => item.getItemData().name,
        indent: 20,
        initialState: {
            expandedItems: ["root", "model", "ui_folder"],
        },
        isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
        rootItemId: "root",
    });

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
                        Установление строгой иерархии слоев и границ зависимостей для обеспечения горизонтальной и вертикальной развязки.
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

                    <section id="entities-structure">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">03</span>
                            Standard Entity Structure
                        </h2>
                        <div className="space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Каждая сущность (entity) — это самодостаточный модуль. Мы используем строгое разделение по подпапкам для предсказуемости и простоты поддержки.
                            </p>
                            
                            <Card className="border-primary/10 bg-muted/30">
                                <CardContent className="p-6">
                                    <Tree
                                        className="before:-ms-1 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
                                        indent={20}
                                        tree={entityTree}
                                    >
                                        {entityTree.getItems().map((item) => (
                                            <TreeItem item={item} key={item.getId()}>
                                                <TreeItemLabel className="before:-inset-y-0.5 before:-z-10 relative before:absolute before:inset-x-0 before:bg-background/0">
                                                    <span className="flex items-center gap-2">
                                                        {item.isFolder() ? (
                                                            item.isExpanded() ? (
                                                                <FolderOpenIcon className="size-4 text-primary/70" />
                                                            ) : (
                                                                <FolderIcon className="size-4 text-primary/70" />
                                                            )
                                                        ) : (
                                                            <FileIcon className="size-4 text-primary/40" />
                                                        )}
                                                        <span className={item.isFolder() ? "font-semibold text-foreground/90 text-sm" : "text-muted-foreground text-sm"}>
                                                            {item.getItemName()}
                                                        </span>
                                                    </span>
                                                </TreeItemLabel>
                                            </TreeItem>
                                        ))}
                                    </Tree>
                                </CardContent>
                            </Card>

                            <div className="grid gap-4 md:grid-cols-2 mt-4">
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-2">
                                        <strong className="text-foreground">api:</strong> RTK Query определения для работы с бэкендом.
                                    </li>
                                    <li className="flex gap-2">
                                        <strong className="text-foreground">types:</strong> Разделение на интерфейсы и типы для чистоты кода.
                                    </li>
                                    <li className="flex gap-2">
                                        <strong className="text-foreground">converters:</strong> Слой трансформации данных (Data Mapping).
                                    </li>
                                </ul>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex gap-2">
                                        <strong className="text-foreground">handlers:</strong> Логика, не привязанная к UI-состоянию.
                                    </li>
                                    <li className="flex gap-2">
                                        <strong className="text-foreground">mock:</strong> Возможность работы без бэкенда.
                                    </li>
                                    <li className="flex gap-2">
                                        <strong className="text-foreground">index.ts:</strong> Точка входа для доступа из верхних слоев.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section id="widgets-structure">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">04</span>
                            Widget: Model & UI Separation
                        </h2>
                        <div className="space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Виджеты — это "умные" блоки. Мы отделяем логику (model) от визуальной части (ui), чтобы упростить тестирование и рефакторинг.
                            </p>

                            <Card className="border-primary/10 bg-muted/30">
                                <CardContent className="p-6">
                                    <Tree
                                        className="before:-ms-1 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
                                        indent={20}
                                        tree={widgetTree}
                                    >
                                        {widgetTree.getItems().map((item) => (
                                            <TreeItem item={item} key={item.getId()}>
                                                <TreeItemLabel className="before:-inset-y-0.5 before:-z-10 relative before:absolute before:inset-x-0 before:bg-background/0">
                                                    <span className="flex items-center gap-2">
                                                        {item.isFolder() ? (
                                                            item.isExpanded() ? (
                                                                <FolderOpenIcon className="size-4 text-primary/70" />
                                                            ) : (
                                                                <FolderIcon className="size-4 text-primary/70" />
                                                            )
                                                        ) : (
                                                            <FileIcon className="size-4 text-primary/40" />
                                                        )}
                                                        <span className={item.isFolder() ? "font-semibold text-foreground/90 text-sm" : "text-muted-foreground text-sm"}>
                                                            {item.getItemName()}
                                                        </span>
                                                    </span>
                                                </TreeItemLabel>
                                            </TreeItem>
                                        ))}
                                    </Tree>
                                </CardContent>
                            </Card>

                            <Card className="border-primary/10 bg-primary/5">
                                <CardContent className="p-4 text-sm">
                                    <p>
                                        <strong>Почему это важно:</strong> Папка <code>model/</code> содержит всё то, что делает виджет функциональным (схемы Zod, конфиги форм, локальные типы). Папка <code>ui/</code> содержит только компоненты отображения.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <section className="space-y-6">
                         <h2 className="text-2xl font-semibold flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">05</span>
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
                             <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">06</span>
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
