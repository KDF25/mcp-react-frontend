import common from "../../../../public/locales/ru/common.json";
import converters from "../../../../public/locales/ru/converters.json";
import creator from "../../../../public/locales/ru/creator.json";
import docs from "../../../../public/locales/ru/docs.json";
import error_boundary from "../../../../public/locales/ru/error_boundary.json";
import fsd from "../../../../public/locales/ru/fsd.json";
import home from "../../../../public/locales/ru/home.json";
import i18n_ns from "../../../../public/locales/ru/i18n.json";
import introduction from "../../../../public/locales/ru/introduction.json";
import memoization from "../../../../public/locales/ru/memoization.json";
import msw from "../../../../public/locales/ru/msw.json";
import naming from "../../../../public/locales/ru/naming.json";
import reference from "../../../../public/locales/ru/reference.json";
import rtk_query from "../../../../public/locales/ru/rtk_query.json";
import structure from "../../../../public/locales/ru/structure.json";
import styles from "../../../../public/locales/ru/styles.json";
import zod from "../../../../public/locales/ru/zod.json";

import type { TResources } from "./i18n.config";

export const RU_TRANSLATION_CHECKER: TResources = {
	common: common,
	creator: creator,
	structure: structure,
	styles: styles,
	zod: zod,
	introduction: introduction,
	naming: naming,
	reference: reference,
	home: home,
	fsd: fsd,
	docs: docs,
	i18n: i18n_ns,
	memoization: memoization,
	error_boundary: error_boundary,
	rtk_query: rtk_query,
	converters: converters,
	msw: msw
};
