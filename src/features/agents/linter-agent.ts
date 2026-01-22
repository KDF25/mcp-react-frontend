import { IViolation, ENUM_SEVERITY, ENUM_AGENT_TYPE } from '@/shared/types/mcp.types';
import { RulesProvider } from '@/entities/rules/lib/rules-provider';

const defaultRules = RulesProvider.getRules();

export class LinterAgent {
    public async checkNaming(fileName: string, content: string): Promise<IViolation[]> {
        const violations: IViolation[] = [];

        const naming = defaultRules?.naming || {};
        const prefixes = naming.prefixes || { interface: 'I', type: 'T', enum: 'ENUM_' };
        const backend = naming.backend || { typeSuffix: 'Backend', fileSuffix: '-backend' };

        // Проверка интерфейсов по префиксу
        const interfaceRegex = /interface\s+([A-Za-z0-9_]+)/g;
        let match;
        const isBackendFile = fileName.includes(backend.fileSuffix);

        while ((match = interfaceRegex.exec(content)) !== null) {
            const name = match[1];
            const hasCorrectPrefix = name.startsWith(prefixes.interface);
            const isPascalAfterPrefix = name.length > prefixes.interface.length && /^[A-Z]/.test(name.slice(prefixes.interface.length));
            const hasBackendSuffix = name.endsWith(backend.typeSuffix);

            // Базовая проверка префикса и PascalCase
            if (!hasCorrectPrefix || !isPascalAfterPrefix) {
                violations.push({
                    agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                    ruleId: 'interface-naming',
                    severity: ENUM_SEVERITY.MEDIUM,
                    location: fileName,
                    message: `Interface "${name}" does not follow the naming convention (must be ${prefixes.interface} + PascalCase).`,
                    suggestion: `Rename to ${prefixes.interface}${name.charAt(0).toUpperCase()}${name.slice(1)}`,
                });
            }

            // Проверка суффикса Backend
            if (isBackendFile && !hasBackendSuffix) {
                violations.push({
                    agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                    ruleId: 'interface-backend-naming',
                    severity: ENUM_SEVERITY.HIGH,
                    location: fileName,
                    message: `Interface "${name}" in a backend file must have "${backend.typeSuffix}" suffix.`,
                    suggestion: `Rename to ${name}${backend.typeSuffix}`,
                });
            } else if (!isBackendFile && hasBackendSuffix) {
                violations.push({
                    agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                    ruleId: 'interface-frontend-naming',
                    severity: ENUM_SEVERITY.MEDIUM,
                    location: fileName,
                    message: `Interface "${name}" should not have "${backend.typeSuffix}" suffix in a regular file. Decouple UI from backend types.`,
                    suggestion: `Rename to ${name.replace(backend.typeSuffix, '')} and move backend type to a "${backend.fileSuffix}" file.`,
                });
            }
        }

        // Проверка типов
        const typeRegex = /type\s+([A-Za-z0-9_]+)\s*=/g;
        while ((match = typeRegex.exec(content)) !== null) {
            const name = match[1];
            const isRegularTypePrefix = name.startsWith(prefixes.type);
            const isPascalAfterPrefix = name.length > prefixes.type.length && /^[A-Z]/.test(name.slice(prefixes.type.length));

            const isEnumType = name.startsWith(prefixes.enum);
            const isCorrectEnumFormat = name.startsWith(prefixes.enum) && name.endsWith('_TYPE') && /^[A-Z0-9_]+$/.test(name);

            if (isEnumType) {
                if (!isCorrectEnumFormat) {
                    violations.push({
                        agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                        ruleId: 'enum-type-naming',
                        severity: ENUM_SEVERITY.MEDIUM,
                        location: fileName,
                        message: `Enum type "${name}" must follow the pattern ${prefixes.enum}NAME_TYPE (all UPPER_CASE).`,
                        suggestion: `Rename to ${name.toUpperCase()}${name.endsWith('_TYPE') ? '' : '_TYPE'}`,
                    });
                }
            } else if (!isRegularTypePrefix || !isPascalAfterPrefix) {
                violations.push({
                    agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                    ruleId: 'type-naming',
                    severity: ENUM_SEVERITY.MEDIUM,
                    location: fileName,
                    message: `Type "${name}" does not follow the naming convention (must be ${prefixes.type} + PascalCase for regular types).`,
                    suggestion: `Rename to ${prefixes.type}${name.charAt(0).toUpperCase()}${name.slice(1)}`,
                });
            }
        }

        // Проверка констант для literal enums
        // Если константа в UPPER_CASE и заканчивается на "as const", она должна начинаться с ENUM_
        const constEnumRegex = /export\s+const\s+([A-Z][A-Z0-9_]+)\s*=\s*{[\s\S]*?}\s*as\s+const/g;
        while ((match = constEnumRegex.exec(content)) !== null) {
            const name = match[1];
            if (!name.startsWith(prefixes.enum)) {
                violations.push({
                    agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                    ruleId: 'enum-const-naming',
                    severity: ENUM_SEVERITY.MEDIUM,
                    location: fileName,
                    message: `Literal enum object "${name}" must start with "${prefixes.enum}" prefix.`,
                    suggestion: `Rename to ${prefixes.enum}${name}`,
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
                    ruleId: 'no-console',
                    severity: ENUM_SEVERITY.MEDIUM,
                    location: fileName,
                    message: 'Usage of console.* is disallowed by linter rules.',
                    suggestion: 'Remove console calls or use a proper logger.',
                });
            }
        }

        if (linter.noAny) {
            const anyRegex = /:\s*any\b|as\s+any\b/g;
            if (anyRegex.test(content)) {
                violations.push({
                    agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                    ruleId: 'no-any',
                    severity: ENUM_SEVERITY.MEDIUM,
                    location: fileName,
                    message: 'Use of `any` is disallowed by linter rules.',
                    suggestion: 'Replace `any` with a more specific type.',
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
                ruleId: 'no-enum',
                severity: ENUM_SEVERITY.MEDIUM,
                location: fileName,
                message: `Use of 'enum ${name}' is disallowed. Replace with a literal exported object prefixed with ENUM_.`,
                suggestion: `Replace with:\nexport const ENUM_${upper} = { /* ... */ } as const;\nexport type ENUM_${upper}_TYPE = typeof ENUM_${upper}[keyof typeof ENUM_${upper}];`,
            });
        }

        // Проверка на использование ad-hoc цветов (slate, blue-500 и т.д.)
        const styles = defaultRules?.styles || { forbiddenColors: [], requiredUtility: 'cn' };
        if (styles.forbiddenColors.length > 0) {
            const forbiddenColorsRegex = new RegExp(`\\b(${styles.forbiddenColors.join('|')})-[a-z0-9]+\\b`, 'g');
            if (forbiddenColorsRegex.test(content)) {
                violations.push({
                    agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                    ruleId: 'no-adhoc-colors',
                    severity: ENUM_SEVERITY.MEDIUM,
                    location: fileName,
                    message: `Usage of ad-hoc Tailwind colors is disallowed. Use theme-based variables (e.g., bg-background, text-primary).`,
                    suggestion: `Replace hardcoded colors with design-system variables.`,
                });
            }
        }

        // Проверка на обязательное использование утилиты 'cn' для конкатенации классов
        if (content.includes('className=') && !content.includes(styles.requiredUtility + '(')) {
            // Это упрощенная проверка, в идеале нужно проверять только динамические классы или несколько классов
            if (content.match(/className=["'][^"']+ [^"']+["']|className={[^}]+}/)) {
                violations.push({
                    agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                    ruleId: 'use-cn-utility',
                    severity: ENUM_SEVERITY.LOW,
                    location: fileName,
                    message: `Use "${styles.requiredUtility}" utility for class merging.`,
                    suggestion: `Wrap classes in ${styles.requiredUtility}(...)`,
                });
            }
        }

        // Проверка наличия конвертеров для API сущностей
        const structure = defaultRules?.structure || { converters: { suffix: '.converters.ts', mandatory: true } };
        if (fileName.includes('/api/') && structure.converters.mandatory) {
            // Если это файл API, мы ожидаем наличие конвертера рядом (это логика для ProjectValidator, но здесь можем дать общую рекомендацию)
            if (!content.includes('map') && !content.includes('Convert')) {
                // Упрощенное предупреждение
            }
        }

        return violations;
    }
}
