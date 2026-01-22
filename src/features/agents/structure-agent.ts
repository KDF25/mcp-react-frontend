import { IViolation, ENUM_SEVERITY, ENUM_AGENT_TYPE } from '@/shared/types/mcp.types';
import { RulesProvider } from '@/entities/rules/lib/rules-provider';

const defaultRules = RulesProvider.getRules();

export class StructureAgent {
    public async checkModuleStructure(modulePath: string, files: string[]): Promise<IViolation[]> {
        const violations: IViolation[] = [];
        const structure = defaultRules.structure;

        // Проверка структуры model
        const modelFiles = files.filter(f => f.includes('/model/'));
        if (modelFiles.length > 0) {
            const rootModelFiles = modelFiles.filter(f => !f.split('/model/')[1].includes('/'));

            if (modelFiles.length > structure.model.baseMaxSize) {
                // Если файлов много, они должны быть в подпапках
                if (rootModelFiles.length > 0) {
                    violations.push({
                        agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                        ruleId: 'structure-model-folders',
                        severity: ENUM_SEVERITY.MEDIUM,
                        location: modulePath,
                        message: `Model has ${modelFiles.length} files. Move them to subfolders: ${structure.model.subfolders.join(', ')}.`,
                        suggestion: `Organize model files into directories.`,
                    });
                }
            }
        }

        // Проверка наличия конвертеров при использовании API
        const hasApiSegment = files.some(f => f.includes('/api/'));

        if (hasApiSegment && structure.converters.mandatory) {
            const hasConverter = files.some(f => f.endsWith(structure.converters.suffix));
            if (!hasConverter) {
                violations.push({
                    agent: ENUM_AGENT_TYPE.STYLE_ENFORCER,
                    ruleId: 'structure-mandatory-converter-for-api',
                    severity: ENUM_SEVERITY.HIGH,
                    location: modulePath,
                    message: `Module "${modulePath}" has an "api" segment but is missing a mandatory converter (*${structure.converters.suffix}).`,
                    suggestion: `Create a converter to decouple Backend DTOs from Frontend Models.`,
                });
            }
        }

        return violations;
    }
}
