import "i18next";

import type { TResources } from "../config/i18n";

declare module "i18next" {
	interface CustomTypeOptions {
		resources: TResources;
	}
}
