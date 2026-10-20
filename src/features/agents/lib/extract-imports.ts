import { Project, SourceFile } from "ts-morph";

/** Module specifiers from `import … from`, side-effect imports and `export … from`. */
export const getModuleSpecifiers = (sourceFile: SourceFile): string[] => {
	const imports = sourceFile
		.getImportDeclarations()
		.map((declaration) => declaration.getModuleSpecifierValue());

	const reExports = sourceFile
		.getExportDeclarations()
		.map((declaration) => declaration.getModuleSpecifierValue())
		.filter((specifier): specifier is string => Boolean(specifier));

	return [...new Set([...imports, ...reExports])];
};

/** Parses in-memory source (e.g. MCP codeSnippets) and returns its module specifiers. */
export const extractImports = (fileName: string, content: string): string[] => {
	const project = new Project({ useInMemoryFileSystem: true });
	const sourceFile = project.createSourceFile(
		fileName.replace(/\\/g, "/").replace(/^\/+/, ""),
		content,
		{ overwrite: true }
	);

	return getModuleSpecifiers(sourceFile);
};
