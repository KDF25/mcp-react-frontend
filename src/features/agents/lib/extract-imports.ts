import { Project, SourceFile, SyntaxKind } from "ts-morph";

export interface ITypeDeclarations {
	interfaces: string[];
	typeAliases: string[];
}

/** Shared in-memory project: snippets are parsed by AST, never by regex over raw text. */
const inMemoryProject = new Project({ useInMemoryFileSystem: true });

const withInMemorySource = <T>(
	fileName: string,
	content: string,
	read: (sourceFile: SourceFile) => T
): T => {
	const sourceFile = inMemoryProject.createSourceFile(
		fileName.replace(/\\/g, "/").replace(/^\/+/, ""),
		content,
		{ overwrite: true }
	);

	try {
		return read(sourceFile);
	} finally {
		inMemoryProject.removeSourceFile(sourceFile);
	}
};

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
export const extractImports = (fileName: string, content: string): string[] =>
	withInMemorySource(fileName, content, getModuleSpecifiers);

/**
 * Text of string-like literals: "…", '…', `…` (static parts of templates) and JSX text.
 * Comments are not included — used for checks on class names, not on prose in comments.
 */
export const extractStringLiterals = (
	fileName: string,
	content: string
): string[] =>
	withInMemorySource(fileName, content, (sourceFile) =>
		sourceFile
			.getDescendants()
			.filter((node) =>
				[
					SyntaxKind.StringLiteral,
					SyntaxKind.NoSubstitutionTemplateLiteral,
					SyntaxKind.TemplateHead,
					SyntaxKind.TemplateMiddle,
					SyntaxKind.TemplateTail,
					SyntaxKind.JsxText
				].includes(node.getKind())
			)
			.map((node) => node.getText())
	);

/** Declared interface / type alias names (comments and string literals are ignored). */
export const extractTypeDeclarations = (
	fileName: string,
	content: string
): ITypeDeclarations =>
	withInMemorySource(fileName, content, (sourceFile) => ({
		interfaces: sourceFile
			.getDescendantsOfKind(SyntaxKind.InterfaceDeclaration)
			.map((declaration) => declaration.getName()),
		typeAliases: sourceFile
			.getDescendantsOfKind(SyntaxKind.TypeAliasDeclaration)
			.map((declaration) => declaration.getName())
	}));
