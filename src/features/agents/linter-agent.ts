import {
	ENUM_AGENT_TYPE,
	ENUM_SEVERITY,
	IViolation
} from "@/shared/types/mcp.types";

import { RulesProvider } from "@/entities/rules/lib/rules-provider";

import { checkConverterUiBoundary } from "./lib/converter-ui-boundary";
import {
	extractStringLiterals,
	extractTypeDeclarations
} from "./lib/extract-imports";
import { checkFilenameCase } from "./lib/filename-case";
import { checkOpenApiTypesBoundary } from "./lib/openapi-types-boundary";

const defaultRules = RulesProvider.getRules();

/** `*Backend` declared outside the entity adapter (`*-backend.interface.ts`). */
const backendOutsideAdapter = (
	fileName: string,
	name: string,
	backendFileMarker: string
): IViolation => ({
	agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
	ruleId: "backend-type-outside-adapter",
	severity: ENUM_SEVERITY.MEDIUM,
	location: fileName,
	message: `Backend type "${name}" is declared outside a "*${backendFileMarker}" adapter. Decouple UI/domain from backend types.`,
	suggestion: `Move "${name}" to entities/<entity>/types/<entity>${backendFileMarker} as a type alias; use frontend I*/T* types here.`
});

export class LinterAgent {
	public async checkNaming(
		fileName: string,
		content: string
	): Promise<IViolation[]> {
		const violations: IViolation[] = [];

		for (const hit of checkFilenameCase(fileName)) {
			violations.push({
				agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
				ruleId: hit.ruleId,
				severity: ENUM_SEVERITY.MEDIUM,
				location: fileName,
				message: hit.message,
				suggestion: hit.suggestion
			});
		}

		for (const hit of checkConverterUiBoundary(fileName, content)) {
			violations.push({
				agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
				ruleId: hit.ruleId,
				severity: ENUM_SEVERITY.HIGH,
				location: fileName,
				message: hit.message,
				suggestion: hit.suggestion
			});
		}

		for (const hit of checkOpenApiTypesBoundary(fileName, content)) {
			violations.push({
				agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
				ruleId: hit.ruleId,
				severity: ENUM_SEVERITY.HIGH,
				location: fileName,
				message: hit.message,
				suggestion: hit.suggestion
			});
		}

		const naming = defaultRules?.naming || {};
		const prefixes = naming.prefixes || {
			interface: "I",
			type: "T",
			enum: "ENUM_"
		};
		const backend = naming.backend || {
			typeSuffix: "Backend",
			fileSuffix: "-backend",
			interfaceExtension: ".interface.ts"
		};
		// Backend-адаптер: только `type T*Backend = …` (алиасы codegen-типов).
		// Единый источник паттерна — naming.backend.typePattern.
		const backendTypePattern = new RegExp(
			backend.typePattern || `^${prefixes.type}.+${backend.typeSuffix}$`
		);
		const backendFileMarker = `${backend.fileSuffix}${backend.interfaceExtension ?? ""}`;
		const isBackendFile = fileName.endsWith(backendFileMarker);

		// Объявления берём из AST — комментарии и строки не дают ложных срабатываний
		const declarations = extractTypeDeclarations(fileName, content);
		let match;

		for (const name of declarations.interfaces) {
			// Backend-файл содержит только type-алиасы, не interface
			// (общая проверка префикса здесь не нужна — одно нарушение, одно срабатывание)
			if (isBackendFile) {
				violations.push({
					agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
					ruleId: "backend-interface-forbidden",
					severity: ENUM_SEVERITY.MEDIUM,
					location: fileName,
					message: `Interface "${name}" in a backend adapter file. Backend types must be type aliases matching ${backendTypePattern.source}.`,
					suggestion: `Replace with: export type ${prefixes.type}Foo${backend.typeSuffix} = FooResponse; (alias of the generated backend.types schema)`
				});
				continue;
			}

			const hasCorrectPrefix = name.startsWith(prefixes.interface);
			const isPascalAfterPrefix =
				name.length > prefixes.interface.length &&
				/^[A-Z]/.test(name.slice(prefixes.interface.length));

			// Базовая проверка префикса и PascalCase
			if (!hasCorrectPrefix || !isPascalAfterPrefix) {
				violations.push({
					agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
					ruleId: "interface-naming",
					severity: ENUM_SEVERITY.MEDIUM,
					location: fileName,
					message: `Interface "${name}" does not follow the naming convention (must be ${prefixes.interface} + PascalCase).`,
					suggestion: `Rename to ${prefixes.interface}${name.charAt(0).toUpperCase()}${name.slice(1)}`
				});
			}

			if (name.endsWith(backend.typeSuffix)) {
				violations.push(
					backendOutsideAdapter(fileName, name, backendFileMarker)
				);
			}
		}

		// Проверка типов
		for (const name of declarations.typeAliases) {
			// В backend-адаптере действует только backend-правило (T*Backend)
			if (isBackendFile) {
				if (!backendTypePattern.test(name)) {
					violations.push({
						agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
						ruleId: "backend-type-naming",
						severity: ENUM_SEVERITY.HIGH,
						location: fileName,
						message: `Type "${name}" in a backend adapter file must match ${backendTypePattern.source}.`,
						suggestion: `Rename to ${name.startsWith(prefixes.type) ? name : prefixes.type + name}${name.endsWith(backend.typeSuffix) ? "" : backend.typeSuffix}`
					});
				}
				continue;
			}

			const isRegularTypePrefix = name.startsWith(prefixes.type);
			const isPascalAfterPrefix =
				name.length > prefixes.type.length &&
				/^[A-Z]/.test(name.slice(prefixes.type.length));

			const isEnumType = name.startsWith(prefixes.enum);
			const isCorrectEnumFormat =
				name.startsWith(prefixes.enum) &&
				name.endsWith("_TYPE") &&
				/^[A-Z0-9_]+$/.test(name);

			if (isEnumType) {
				if (!isCorrectEnumFormat) {
					violations.push({
						agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
						ruleId: "enum-type-naming",
						severity: ENUM_SEVERITY.MEDIUM,
						location: fileName,
						message: `Enum type "${name}" must follow the pattern ${prefixes.enum}NAME_TYPE (all UPPER_CASE).`,
						suggestion: `Rename to ${name.toUpperCase()}${name.endsWith("_TYPE") ? "" : "_TYPE"}`
					});
				}
			} else if (!isRegularTypePrefix || !isPascalAfterPrefix) {
				violations.push({
					agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
					ruleId: "type-naming",
					severity: ENUM_SEVERITY.MEDIUM,
					location: fileName,
					message: `Type "${name}" does not follow the naming convention (must be ${prefixes.type} + PascalCase for regular types).`,
					suggestion: `Rename to ${prefixes.type}${name.charAt(0).toUpperCase()}${name.slice(1)}`
				});
			}

			if (name.endsWith(backend.typeSuffix)) {
				violations.push(
					backendOutsideAdapter(fileName, name, backendFileMarker)
				);
			}
		}

		// Проверка констант для literal enums
		// Если константа в UPPER_CASE и заканчивается на "as const", она должна начинаться с ENUM_
		const constEnumRegex =
			/export\s+const\s+([A-Z][A-Z0-9_]+)\s*=\s*{[\s\S]*?}\s*as\s+const/g;
		while ((match = constEnumRegex.exec(content)) !== null) {
			const name = match[1];
			if (!name.startsWith(prefixes.enum)) {
				violations.push({
					agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
					ruleId: "enum-const-naming",
					severity: ENUM_SEVERITY.MEDIUM,
					location: fileName,
					message: `Literal enum object "${name}" must start with "${prefixes.enum}" prefix.`,
					suggestion: `Rename to ${prefixes.enum}${name}`
				});
			}
		}

		// Linter rules: noConsole, noAny
		const linter = defaultRules?.linter || {};
		if (linter.noConsole) {
			const consoleRegex = /\bconsole\./g;
			if (consoleRegex.test(content)) {
				violations.push({
					agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
					ruleId: "no-console",
					severity: ENUM_SEVERITY.MEDIUM,
					location: fileName,
					message:
						"Usage of console.* is disallowed by linter rules.",
					suggestion: "Remove console calls or use a proper logger."
				});
			}
		}

		if (linter.noAny) {
			const anyRegex = /:\s*any\b|as\s+any\b/g;
			if (anyRegex.test(content)) {
				violations.push({
					agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
					ruleId: "no-any",
					severity: ENUM_SEVERITY.MEDIUM,
					location: fileName,
					message: "Use of `any` is disallowed by linter rules.",
					suggestion: "Replace `any` with a more specific type."
				});
			}
		}

		// Проверка: запрещаем объявление `enum` — используем литеральный ENUM_<NAME> объект + тип
		const enumRegex = /enum\s+([A-Za-z0-9_]+)/g;
		while ((match = enumRegex.exec(content)) !== null) {
			const name = match[1];
			const upper = name.toUpperCase();
			violations.push({
				agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
				ruleId: "no-enum",
				severity: ENUM_SEVERITY.MEDIUM,
				location: fileName,
				message: `Use of 'enum ${name}' is disallowed. Replace with a literal exported object prefixed with ENUM_.`,
				suggestion: `Replace with:\nexport const ENUM_${upper} = { /* ... */ } as const;\nexport type ENUM_${upper}_TYPE = typeof ENUM_${upper}[keyof typeof ENUM_${upper}];`
			});
		}

		// Проверка на использование ad-hoc цветов (slate, blue-500 и т.д.)
		const styles = defaultRules?.styles || {
			forbiddenColors: [],
			requiredUtility: "cn"
		};
		const staticColors = styles.forbiddenStaticColors ?? [];
		// text-white / !bg-black / hover:border-white/50 — статические цвета без шкалы.
		// Lookbehind вместо набора символов: подходит любой разделитель (пробел, кавычка, !, :, ( …)
		const staticColorsRegex =
			staticColors.length > 0
				? new RegExp(
						`(?<![\\w-])(?:bg|text|border|ring|outline|fill|stroke|from|via|to|divide|placeholder|caret|accent|decoration|shadow)-(${staticColors.join("|")})(?![\\w-])`
					)
				: null;

		if (styles.forbiddenColors.length > 0 || staticColorsRegex) {
			const forbiddenColorsRegex = new RegExp(
				`\\b(${styles.forbiddenColors.join("|")})-[a-z0-9]+\\b`
			);
			// JS/TS: только строковые литералы и JSX-текст из AST (комментарии не проверяем).
			// CSS/SCSS и прочее (@apply bg-blue-500) — проверяем текст целиком.
			const isScript = /\.(m|c)?[jt]sx?$/.test(fileName);
			const classText = isScript
				? extractStringLiterals(fileName, content).join("\n")
				: content;
			if (
				(styles.forbiddenColors.length > 0 &&
					forbiddenColorsRegex.test(classText)) ||
				staticColorsRegex?.test(classText)
			) {
				violations.push({
					agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
					ruleId: "no-adhoc-colors",
					severity: ENUM_SEVERITY.MEDIUM,
					location: fileName,
					message: `Usage of ad-hoc Tailwind colors is disallowed. Use theme-based variables (e.g., bg-background, text-primary).`,
					suggestion: `Replace hardcoded colors with design-system variables.`
				});
			}
		}

		// Проверка на обязательное использование утилиты 'cn' для конкатенации классов
		if (
			content.includes("className=") &&
			!content.includes(styles.requiredUtility + "(")
		) {
			// Это упрощенная проверка, в идеале нужно проверять только динамические классы или несколько классов
			if (
				content.match(
					/className=["'][^"']+ [^"']+["']|className={[^}]+}/
				)
			) {
				violations.push({
					agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
					ruleId: "use-cn-utility",
					severity: ENUM_SEVERITY.LOW,
					location: fileName,
					message: `Use "${styles.requiredUtility}" utility for class merging.`,
					suggestion: `Wrap classes in ${styles.requiredUtility}(...)`
				});
			}
		}

		// Проверка наличия конвертеров для API сущностей
		const structure = defaultRules?.structure || {
			converters: { suffix: ".converters.ts", mandatory: true }
		};
		if (fileName.includes("/api/") && structure.converters.mandatory) {
			// Если это файл API, мы ожидаем наличие конвертера рядом (это логика для ProjectValidator, но здесь можем дать общую рекомендацию)
			if (!content.includes("map") && !content.includes("Convert")) {
				// Упрощенное предупреждение
			}
		}

		return violations;
	}
}
