interface ITranslationBlock {
	folder: string;
	namespaces: string[];
}

export const TRANSLATION_BLOCKS: Record<string, ITranslationBlock> = {
	shared: {
		folder: "",
		namespaces: ["common"]
	}
};

export const getNamespacePath = (lng: string, ns: string): string => {
	for (const block of Object.values(TRANSLATION_BLOCKS)) {
		if (block.namespaces.includes(ns)) {
			return block.folder
				? `/locales/${lng}/${block.folder}/${ns}.json`
				: `/locales/${lng}/${ns}.json`;
		}
	}
	return `/locales/${lng}/${ns}.json`;
};
