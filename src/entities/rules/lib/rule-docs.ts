import { RULE_DOCS, TRuleDocId } from "../config/rule-docs.generated";

export type { TRuleDocId };

export interface IRuleDocSummary {
	id: TRuleDocId;
	title: string;
	uri: string;
}

export interface IRuleDoc extends IRuleDocSummary {
	path: string;
	content: string;
}

export const RULE_DOC_URI_PREFIX = "rules://docs/";

export const RULE_DOC_IDS = Object.keys(RULE_DOCS) as TRuleDocId[];

export const getRuleDocUri = (id: TRuleDocId): string =>
	`${RULE_DOC_URI_PREFIX}${id}`;

export const isRuleDocId = (id: string): id is TRuleDocId =>
	Object.prototype.hasOwnProperty.call(RULE_DOCS, id);

export const getRuleDoc = (id: string): IRuleDoc | undefined => {
	if (!isRuleDocId(id)) return undefined;
	const doc = RULE_DOCS[id];
	return { id, uri: getRuleDocUri(id), ...doc };
};

export const listRuleDocs = (): IRuleDocSummary[] =>
	RULE_DOC_IDS.map((id) => ({
		id,
		title: RULE_DOCS[id].title,
		uri: getRuleDocUri(id)
	}));
