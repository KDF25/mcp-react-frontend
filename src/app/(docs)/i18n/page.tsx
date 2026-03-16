"use client";

import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import {
	BookIcon,
	Code2Icon,
	FileCodeIcon,
	FolderIcon,
	FolderOpenIcon,
	InfoIcon,
	LayersIcon,
	SearchIcon
} from "lucide-react";

import { Badge, Card, CardContent, CodeBlock } from "@/shared/ui";
import { Tree, TreeItem, TreeItemLabel } from "@/shared/ui";

interface Item {
	name: string;
	children?: string[];
}

const i18nStructureItems: Record<string, Item> = {
	root: { name: "src", children: ["shared"] },
	shared: { name: "shared", children: ["config", "global_types"] },
	config: { name: "config", children: ["i18n", "languages"] },
	i18n: {
		name: "i18n",
		children: [
			"checker",
			"init",
			"key",
			"types",
			"config_f",
			"blocks",
			"change_l",
			"index_i"
		]
	},
	checker: { name: "i18n.checker.ts" },
	init: { name: "i18n.init.ts" },
	key: { name: "i18n-key.ts" },
	types: { name: "i18n.types.ts" },
	config_f: { name: "i18n.config.ts" },
	blocks: { name: "i18n.blocks.ts" },
	change_l: { name: "change-language.ts" },
	index_i: { name: "index.ts" },
	languages: {
		name: "languages",
		children: ["l_types", "l_config", "index_l"]
	},
	l_types: { name: "languages.types.ts" },
	l_config: { name: "languages.config.ts" },
	index_l: { name: "index.ts" },
	global_types: { name: "types", children: ["i18n_d"] },
	i18n_d: { name: "i18n.d.ts" }
};

const detailedFiles = [
	{
		title: "i18n-key.ts",
		description:
			"Легковесная обертка для типизации строковых ключей. Это identity function, которая в рантайме ничего не делает, но в IDE обеспечивает автодополнение и проверку существования ключа для конкретного Namespace.",
		code: `export const i18nKey =
    <Keys extends string>() =>
    <K extends Keys>(key: K) =>
        key;`
	},
	{
		title: "i18n.types.ts",
		description:
			"Содержит 'магию' TypeScript для работы с вложенными JSON-объектами. Тип TNestedKeyOf рекурсивно обходит структуру файлов переводов и генерирует список ключей через точку (например, 'errors.validation.required').",
		code: `export type TDotPrefix<T extends string, P extends string> = P extends ""
    ? T
    : \`\${P}.\${T}\`;

export type TNestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & string]: ObjectType[Key] extends object
        ? TDotPrefix<TNestedKeyOf<ObjectType[Key]>, Key>
        : Key;
}[keyof ObjectType & string];`
	},
	{
		title: "i18n.d.ts",
		description:
			"Глобальное переопределение типов библиотеки i18next. Связывает внутреннюю систему типов проекта с механизмом i18next, делая стандартный хук useTranslation() полностью типизированным.",
		code: `import "i18next";
import type { TResources } from "../config";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: TResources;
    }
}`
	},
	{
		title: "i18n.config.ts",
		description:
			"Главный хаб типизации. Импортирует английские JSON-файлы как мастер-схему. На их основе создаются типы для каждого Namespace (TCommon, THeader и т.д.) и формируется общий тип TResources.",
		code: `import common from "../../../../public/locales/en/common.json";
import header from "../../../../public/locales/en/header.json";

export type TCommon = typeof common;
export type THeader = typeof header;

export type TResources = {
    common: TCommon;
    header: THeader;
};

export const NS = ["common", "header"] as const;`
	},
	{
		title: "i18n.blocks.ts",
		description:
			"Файл конфигурации физического расположения файлов. Он группирует namespaces в подпапки (booking, finance) и содержит функцию getNamespacePath для динамической подгрузки чанков.",
		code: `export const TRANSLATION_BLOCKS = {
    booking: { folder: "booking", namespaces: ["orders_page"] },
    shared: { folder: "", namespaces: ["header", "common"] }
};

export const getNamespacePath = (lng: string, ns: string): string => {
    for (const block of Object.values(TRANSLATION_BLOCKS)) {
        if (block.namespaces.includes(ns)) {
            return block.folder
                ? \`/locales/\${lng}/\${block.folder}/\${ns}.json\`
                : \`/locales/\${lng}/\${ns}.json\`;
        }
    }
    return \`/locales/\${lng}/\${ns}.json\`;
};`
	},
	{
		title: "i18n.checker.ts",
		description:
			"Статический тест консистентности. Массив RU_TRANSLATION_CHECKER принудительно типизируется через TResources. Если в русской версии пропущено поле — возникнет ошибка компиляции.",
		code: `import type { TResources } from "./i18n.config";
import common_ru from "../../../../public/locales/ru/common.json";

export const RU_TRANSLATION_CHECKER: TResources = {
    common: common_ru, // Ошибка если ключи не совпадают с английскими
};`
	},
	{
		title: "i18n.init.ts",
		description:
			"Инициализация библиотеки i18next. Настраивает плагины, устанавливает fallback язык и связывает NS и getNamespacePath в единую конфигурацию.",
		code: `import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NS } from "./i18n.config";
import { getNamespacePath } from "./i18n.blocks";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    ns: NS,
    backend: {
        loadPath: (lngs, nss) => getNamespacePath(lngs[0], nss[0])
    }
});
export default i18n;`
	},
	{
		title: "change-language.ts",
		description:
			"Утилита для переключения языка в рантайме. Меняет состояние i18next и синхронизирует выбор пользователя в localStorage.",
		code: `import { default as i18n } from "./i18n.init";

export const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
};`
	},
	{
		title: "languages.types.ts",
		description:
			"Определяет ENUM_LANGUAGES — константу со списком всех поддерживаемых кодов языков (en, ru). Единственный источник правды для локалей.",
		code: `export const ENUM_LANGUAGES = {
    EN: "en",
    RU: "ru"
} as const;`
	},
	{
		title: "languages.config.ts",
		description:
			"Метаданные языков для UI (labels, иконки). Используется в компонентах переключателей языка.",
		code: `import { ENUM_LANGUAGES } from "./languages.types";

export const LANGUAGES_LIST = [
    { value: ENUM_LANGUAGES.EN, label: "En" },
    { value: ENUM_LANGUAGES.RU, label: "Ru" }
];`
	},
	{
		title: "index.ts",
		description:
			"Public API папок конфигураций. Собирает функции и типы воедино для удобного импорта другими слоями приложения.",
		code: `export * from "./change-language";
export * from "./i18n-key";
export { default as i18n } from "./i18n.init";`
	}
];

export default function I18nMasterPage() {
	const i18nTree = useTree<Item>({
		dataLoader: {
			getChildren: (itemId) => i18nStructureItems[itemId].children ?? [],
			getItem: (itemId) => i18nStructureItems[itemId]
		},
		features: [syncDataLoaderFeature, hotkeysCoreFeature],
		getItemName: (item) => item.getItemData().name,
		indent: 18,
		initialState: {
			expandedItems: [
				"root",
				"shared",
				"config",
				"i18n",
				"languages",
				"types"
			]
		},
		isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
		rootItemId: "root"
	});

	return (
		<>
			<div className="space-y-6">
				<div className="flex items-center gap-2">
					<Badge
						variant="outline"
						className="text-primary px-3 py-1 font-mono text-xs border-primary/30"
					>
						SHARED CONFIG
					</Badge>
					<Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] uppercase font-bold tracking-widest">
						Master Version
					</Badge>
				</div>
				<h1 className="text-6xl font-black tracking-tight leading-none">
					Система i18n
				</h1>
				<p className="text-2xl text-muted-foreground max-w-4xl font-light">
					Исчерпывающее руководство по архитектуре
					интернационализации. Включает 11 файлов конфигурации и
					глобальные определения типов.
				</p>
			</div>

			<div className="grid gap-12 lg:grid-cols-[320px_1fr]">
				<aside className="space-y-6 lg:sticky lg:top-24 h-fit">
					<div className="space-y-2">
						<h2 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
							<LayersIcon className="size-4" /> Structure Tree
						</h2>
						<p className="text-[11px] text-muted-foreground uppercase tracking-tighter">
							Shared layer overview
						</p>
					</div>
					<Card className="border-primary/10 bg-muted/20 backdrop-blur-sm shadow-xl">
						<CardContent className="p-4">
							<Tree
								indent={16}
								tree={i18nTree}
								className="text-[12px] font-mono"
							>
								{i18nTree.getItems().map((item) => (
									<TreeItem item={item} key={item.getId()}>
										<TreeItemLabel>
											<span className="flex items-center gap-2 py-1">
												{item.isFolder() ? (
													item.isExpanded() ? (
														<FolderOpenIcon className="size-3.5 text-primary" />
													) : (
														<FolderIcon className="size-3.5 text-primary" />
													)
												) : (
													<FileCodeIcon className="size-3.5 text-muted-foreground/60" />
												)}
												<span
													className={
														item.isFolder()
															? "font-bold text-foreground"
															: "text-foreground/80"
													}
												>
													{item.getItemName()}
												</span>
											</span>
										</TreeItemLabel>
									</TreeItem>
								))}
							</Tree>
						</CardContent>
					</Card>
				</aside>

				<div className="space-y-24">
					{detailedFiles.map((file, idx) => (
						<section
							key={file.title}
							className="space-y-8 scroll-mt-24"
						>
							<div className="space-y-6 border-l-4 border-primary pl-8">
								<div className="space-y-1">
									<div className="flex items-center gap-3">
										<Badge className="bg-primary text-white font-mono rounded-none px-2">
											{idx + 1}
										</Badge>
										<h3 className="text-4xl font-black tracking-tighter uppercase">
											{file.title}
										</h3>
									</div>
									<div className="flex items-center gap-2 text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
										<FolderIcon className="size-2.5" />{" "}
										shared/
										{file.title.includes("d.ts")
											? "types"
											: file.title.includes("languages")
												? "config/languages"
												: "config/i18n"}
										/{file.title}
									</div>
								</div>

								<div className="space-y-4">
									<div className="flex items-center gap-2 text-primary">
										<InfoIcon className="size-5" />
										<h4 className="font-bold text-lg tracking-tight">
											Назначение файла
										</h4>
									</div>
									<p className="text-lg text-foreground/80 leading-relaxed font-normal">
										{file.description}
									</p>
								</div>
							</div>

							<Card className="border-none shadow-2xl bg-zinc-950/90 overflow-hidden ring-1 ring-white/10">
								<div className="bg-zinc-900 px-4 py-2 border-b border-white/5 flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Code2Icon className="size-3 text-primary" />
										<span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
											Source Implementation
										</span>
									</div>
									<Badge
										variant="outline"
										className="text-[9px] border-zinc-800 text-zinc-500 uppercase"
									>
										{file.title.endsWith(".d.ts")
											? "definition"
											: "typescript"}
									</Badge>
								</div>
								<CodeBlock
									filename={file.title}
									language="typescript"
									code={file.code}
								/>
							</Card>
						</section>
					))}

					<section className="bg-zinc-900 p-12 rounded-[3.5rem] border border-white/5 shadow-inner">
						<div className="space-y-8">
							<h3 className="text-5xl font-black tracking-tighter text-white">
								Архитектурная связь
							</h3>
							<div className="grid gap-10 md:grid-cols-2">
								<div className="space-y-4">
									<div className="flex items-center gap-2 text-primary">
										<BookIcon className="size-5" />
										<h4 className="font-bold uppercase tracking-widest text-xs">
											Types Safety Hub
										</h4>
									</div>
									<p className="text-sm text-zinc-400 leading-relaxed italic">
										Файл <code>i18n.d.ts</code> является
										мостом между вашими JSON-матрицами и
										библиотекой i18next. Это делает
										невозможным использование
										несуществующего ключа в коде.
									</p>
								</div>
								<div className="space-y-4">
									<div className="flex items-center gap-2 text-primary">
										<SearchIcon className="size-5" />
										<h4 className="font-bold uppercase tracking-widest text-xs">
											Checker Control
										</h4>
									</div>
									<p className="text-sm text-zinc-400 leading-relaxed italic">
										Механизм <code>i18n.checker.ts</code>{" "}
										гарантирует, что каждый новый ключ в
										английской версии будет немедленно
										подсвечен как ошибка в русской, пока не
										будет добавлен перевод.
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
