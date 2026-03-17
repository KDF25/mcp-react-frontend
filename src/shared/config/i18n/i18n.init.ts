"use client";

import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { getNamespacePath } from "./i18n.blocks";
import { NS } from "./i18n.config";

i18n.use(HttpBackend)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		ns: [...NS],
		defaultNS: NS[0],
		backend: {
			loadPath: (languages: string[], namespaces: string[]) =>
				getNamespacePath(languages[0], namespaces[0])
		},
		interpolation: {
			escapeValue: false
		},
		react: {
			useSuspense: false // Prevents Next.js SSR build from hanging while waiting for translations
		}
	});

export default i18n;
