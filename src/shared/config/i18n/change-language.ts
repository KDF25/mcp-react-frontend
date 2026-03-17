import type { ENUM_LANGUAGES } from "../languages";

import { default as i18n } from "./i18n.init";

export const changeLanguage = (lng: ENUM_LANGUAGES) => {
	i18n.changeLanguage(lng);
	localStorage.setItem("i18nextLng", lng);
};
