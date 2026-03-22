import common from "../../../../public/locales/en/common.json";
import creator from "../../../../public/locales/en/creator.json";
import docs from "../../../../public/locales/en/docs.json";
import error_boundary from "../../../../public/locales/en/error_boundary.json";
import fsd from "../../../../public/locales/en/fsd.json";
import home from "../../../../public/locales/en/home.json";
import i18n_ns from "../../../../public/locales/en/i18n.json";
import introduction from "../../../../public/locales/en/introduction.json";
import memoization from "../../../../public/locales/en/memoization.json";
import naming from "../../../../public/locales/en/naming.json";
import reference from "../../../../public/locales/en/reference.json";
import rtk_query from "../../../../public/locales/en/rtk_query.json";
import structure from "../../../../public/locales/en/structure.json";
import styles from "../../../../public/locales/en/styles.json";
import zod from "../../../../public/locales/en/zod.json";

import type { TNestedKeyOf } from "./i18n.types";

export type TCommon = typeof common;
export type TCreator = typeof creator;
export type TStructure = typeof structure;
export type TStyles = typeof styles;
export type TZod = typeof zod;
export type TIntroduction = typeof introduction;
export type TNaming = typeof naming;
export type TReference = typeof reference;
export type THome = typeof home;
export type TFsd = typeof fsd;
export type TDocs = typeof docs;
export type TI18n = typeof i18n_ns;
export type TMemoization = typeof memoization;
export type TErrorBoundary = typeof error_boundary;
export type TRtkQuery = typeof rtk_query;

export type TResources = {
	common: TCommon;
	creator: TCreator;
	structure: TStructure;
	styles: TStyles;
	zod: TZod;
	introduction: TIntroduction;
	naming: TNaming;
	reference: TReference;
	home: THome;
	fsd: TFsd;
	docs: TDocs;
	i18n: TI18n;
	memoization: TMemoization;
	error_boundary: TErrorBoundary;
	rtk_query: TRtkQuery;
};

export const NS = [
	"common",
	"creator",
	"structure",
	"styles",
	"zod",
	"introduction",
	"naming",
	"reference",
	"home",
	"fsd",
	"docs",
	"i18n",
	"memoization",
	"error_boundary",
	"rtk_query"
] as const;
export type TNS = (typeof NS)[number];
export type TCommonKeys = TNestedKeyOf<TCommon>;
