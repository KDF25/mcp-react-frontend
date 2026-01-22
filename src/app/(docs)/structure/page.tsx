"use client";

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
} from "@/shared/ui"
import { RulesProvider } from "@/entities/rules/lib/rules-provider"
import { ENUM_ROUTES } from "@/shared/config/routes"
import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import { Tree, TreeItem, TreeItemLabel } from "@/shared/ui/tree";

interface Item {
    name: string;
    children?: string[];
}

const structureItems: Record<string, Item> = {
    root: { name: "src", children: ["app", "pages", "widgets", "features", "entities", "shared"] },
    app: { name: "app", children: ["app_layout", "app_page"] },
    app_layout: { name: "layout.tsx" },
    app_page: { name: "page.tsx" },
    pages: { name: "pages" },
    widgets: { name: "widgets" },
    features: { name: "features" },
    entities: { name: "entities", children: ["rules_entity"] },
    rules_entity: { name: "rules", children: ["rules_model", "rules_ui", "rules_lib", "rules_api"] },
    rules_model: { name: "model", children: ["rules_types", "rules_slice", "rules_selectors", "rules_actions"] },
    rules_types: { name: "types.ts" },
    rules_slice: { name: "slice.ts" },
    rules_selectors: { name: "selectors.ts" },
    rules_actions: { name: "actions.ts" },
    rules_ui: { name: "ui" },
    rules_lib: { name: "lib", children: ["rules_provider"] },
    rules_provider: { name: "rules-provider.ts" },
    rules_api: { name: "api" },
    shared: { name: "shared", children: ["shared_ui", "shared_config"] },
    shared_ui: { name: "ui", children: ["shadcn_ui"] },
    shadcn_ui: { name: "shadcn-ui" },
    shared_config: { name: "config", children: ["routes_config"] },
    routes_config: { name: "routes.ts" },
};

export default function StructurePage() {
    const rules = RulesProvider.getRules();
    const structure = rules.structure;

    const tree = useTree<Item>({
        dataLoader: {
            getChildren: (itemId) => structureItems[itemId].children ?? [],
            getItem: (itemId) => structureItems[itemId],
        },
        features: [syncDataLoaderFeature, hotkeysCoreFeature],
        getItemName: (item) => item.getItemData().name,
        indent: 20,
        initialState: {
            expandedItems: ["root", "entities", "rules_entity", "rules_model"],
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
                                <BreadcrumbPage>File Structure</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-8 p-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">Project File Structure</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Deterministic organization of modules and folders to maintain extreme scalability and zero-config discoverability.
                    </p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">01</span>
                            Model Folder Constraints
                        </h2>
                        
                        <Card className="border-primary/10 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-4">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg">Structural Governance</CardTitle>
                                    <CardDescription>Hard limits for entity internal structure</CardDescription>
                                </div>
                                <Badge variant="outline" className="text-primary border-primary/30">
                                    SIZE LIMIT: {structure.model.baseMaxSize}
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Required Subdirectories</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {structure.model.subfolders.map(folder => (
                                            <Badge key={folder} variant="secondary" className="font-mono bg-primary/5 text-primary border border-primary/10">
                                                {folder}/
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Mandatory Files</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {structure.model.requiredFiles.map(file => (
                                            <Badge key={file} variant="outline" className="font-mono text-[11px]">
                                                {file}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">02</span>
                            Visual Hierarchy (Interactive)
                        </h2>
                        <Card className="border-primary/10 bg-muted/30">
                            <CardContent className="p-6">
                                <Tree
                                    className="before:-ms-1 relative before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
                                    indent={20}
                                    tree={tree}
                                >
                                    {tree.getItems().map((item) => {
                                        return (
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
                                                        <span className={item.isFolder() ? "font-semibold text-foreground/90" : "text-muted-foreground"}>
                                                            {item.getItemName()}
                                                        </span>
                                                    </span>
                                                </TreeItemLabel>
                                            </TreeItem>
                                        );
                                    })}
                                </Tree>
                            </CardContent>
                        </Card>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">03</span>
                            System Converters
                        </h2>
                        <Card className="border-primary/5 bg-primary/5">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="font-bold">Naming Pattern Enforcement</h3>
                                    <p className="text-xs text-muted-foreground tracking-tight">All data mappers/converters must include this specific suffix.</p>
                                </div>
                                <div className="text-xl font-black font-mono text-primary/80 tracking-tighter border-b-2 border-primary/20">
                                    {structure.converters.suffix}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </main>
        </>
    )
}
