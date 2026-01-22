import { Project } from 'ts-morph';
import { glob } from 'glob';
import { FsdAgent } from '@/features/agents/fsd-agent';
import { LinterAgent } from '@/features/agents/linter-agent';
import { StructureAgent } from '@/features/agents/structure-agent';
import { IViolation } from '@/shared/types/mcp.types';
import path from 'path';

export class ProjectValidator {
    private project: Project;
    private fsdAgent: FsdAgent;
    private linterAgent: LinterAgent;
    private structureAgent: StructureAgent;

    constructor() {
        this.project = new Project();
        this.fsdAgent = new FsdAgent();
        this.linterAgent = new LinterAgent();
        this.structureAgent = new StructureAgent();
    }

    public async validateProject(rootPath: string): Promise<IViolation[]> {
        const violations: IViolation[] = [];
        const tsFiles = await glob('src/**/*.{ts,tsx}', { cwd: rootPath });

        for (const filePath of tsFiles) {
            const fullPath = path.join(rootPath, filePath);
            const sourceFile = this.project.addSourceFileAtPath(fullPath);
            const content = sourceFile.getFullText();

            // Check naming and styling
            const namingViolations = await this.linterAgent.checkNaming(filePath, content);
            violations.push(...namingViolations);

            // Check FSD (extract imports)
            const imports = sourceFile.getImportDeclarations().map(id => id.getModuleSpecifierValue());
            const fsdViolations = await this.fsdAgent.analyze([{ path: filePath, imports }]);
            violations.push(...fsdViolations);

            this.project.removeSourceFile(sourceFile);
        }

        // Группировка файлов по модулям для проверки структуры (упрощенно)
        const modules = new Set(tsFiles.map(f => {
            const parts = f.split('/');
            if (parts.length >= 3) return parts.slice(0, 3).join('/'); // e.g. src/entities/user
            return null;
        }).filter(Boolean));

        for (const mod of modules) {
            if (!mod) continue;
            const moduleFiles = tsFiles.filter(f => f.startsWith(mod));
            const structViolations = await this.structureAgent.checkModuleStructure(mod, moduleFiles);
            violations.push(...structViolations);
        }

        return violations;
    }
}
