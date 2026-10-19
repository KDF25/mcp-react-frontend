/** kebab/snake/name → PascalCase (`user-group` → `UserGroup`) */
export const toPascalCase = (name: string): string =>
	name
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map(
			(part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
		)
		.join("");

/** kebab/snake/name → camelCase (`user-group` → `userGroup`) */
export const toCamelCase = (name: string): string => {
	const pascal = toPascalCase(name);
	return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

/** PascalCase plural for abstract names (`Entity` → `Entities`, not `Entitys`). */
export const toPluralPascal = (pascal: string): string => {
	if (/[^aeiou]y$/i.test(pascal)) {
		return `${pascal.slice(0, -1)}ies`;
	}
	if (/(?:s|x|z|ch|sh)$/i.test(pascal)) {
		return `${pascal}es`;
	}
	return `${pascal}s`;
};

/** Converter export names follow `map{Thing}ToFrontend|ToBackend` (not literal `mapToFrontend`). */
export const converterMethodNames = (entityName: string) => {
	const pascal = toPascalCase(entityName);
	const pluralPascal = toPluralPascal(pascal);

	return {
		itemToFrontend: `map${pascal}ToFrontend`,
		itemToBackend: `map${pascal}ToBackend`,
		listToFrontend: `map${pluralPascal}ToFrontend`,
		queryToBackend: `map${pluralPascal}QueryToBackend`,
		createToBackend: `mapCreate${pascal}ToBackend`,
		updateToBackend: `mapUpdate${pascal}ToBackend`
	};
};
