import { IViolation, ENUM_SEVERITY, ENUM_AGENT_TYPE } from '@/shared/types/mcp.types';
import { RulesProvider } from '@/entities/rules/lib/rules-provider';

const defaultRules = RulesProvider.getRules();

export class FsdAgent {
    public async analyze(files: Array<string | { path: string; imports?: string[] }>): Promise<IViolation[]> {
        const violations: IViolation[] = [];

        // Построим карту разрешённых импортов из правил
        const boundaries = defaultRules?.fsd?.boundaries || [];
        const allowMap: Record<string, string[]> = {};
        for (const b of boundaries) {
            allowMap[b.from] = b.allow || [];
        }

        const layers: string[] = defaultRules?.fsd?.layers || [];

        for (const fileItem of files) {
            const path = typeof fileItem === 'string' ? fileItem : fileItem.path;
            const imports: string[] = typeof fileItem === 'string' ? [] : (fileItem.imports || []);

            const fromLayer = layers.find((l: string) => path.includes(`/${l}/`));
            if (!fromLayer) continue;

            // Если список импортов не передан — пропускаем проверку
            for (const imp of imports) {
                const toLayer = layers.find((l: string) => imp.includes(`/${l}/`) || imp.startsWith(l + '/'));
                if (!toLayer) continue;

                const allowed: string[] = allowMap[fromLayer] || [];
                if (!allowed.includes(toLayer) && toLayer !== fromLayer) {
                    violations.push({
                        agent: ENUM_AGENT_TYPE.FSD_INSPECTOR,
                        ruleId: 'fsd-layer-violation',
                        severity: ENUM_SEVERITY.HIGH,
                        location: `${path} -> ${imp}`,
                        message: `Layer violation: "${fromLayer}" must not import from "${toLayer}".`,
                        suggestion: 'Move the shared logic to Shared layer or refactor the dependency.',
                    });
                }

                // Проверка на приватные импорты (инкапсуляция слайсов через index.ts)
                const isShared = toLayer === 'shared';
                if (!isShared && defaultRules?.fsd?.rules?.['enforce-barrel-exports']) {
                    // Например, импорт "@/entities/user/model/types" вместо "@/entities/user"
                    // Логика: если в пути импорта после слоя и слайса есть еще сегменты — это нарушение
                    const parts = imp.split('/');
                    const layerIndex = parts.findIndex(p => p === toLayer || p === `@/${toLayer}`);
                    if (layerIndex !== -1 && parts.length > layerIndex + 2) {
                        violations.push({
                            agent: ENUM_AGENT_TYPE.FSD_INSPECTOR,
                            ruleId: 'fsd-private-import',
                            severity: ENUM_SEVERITY.MEDIUM,
                            location: `${path} -> ${imp}`,
                            message: `Private import: Access to slice "${parts[layerIndex + 1]}" must be through public API (index.ts).`,
                            suggestion: `Import from "@/${toLayer}/${parts[layerIndex + 1]}" instead of direct path.`,
                        });
                    }
                }
            }
        }

        return violations;
    }

    private hasImportFrom(file: string, layer: string): boolean {
        // Устаревшая заглушка; теперь `analyze` поддерживает передачу списка импортов
        return false;
    }
}
