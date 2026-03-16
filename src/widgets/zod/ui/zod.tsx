"use client";

import { ZodArchitecture } from "./zod-architecture";
import { ZodImportance } from "./zod-importance";
import { ZodPattern } from "./zod-pattern";

export function Zod() {
	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<h1 className="text-4xl font-extrabold tracking-tight">
					Zod Validation & Typing
				</h1>
				<p className="text-xl text-muted-foreground leading-relaxed">
					Связка схем валидации, автоматической типизации и
					локализованных сообщений об ошибках.
				</p>
			</div>
			<div className="space-y-12 pb-12">
				<ZodArchitecture />
				<ZodPattern />
				<ZodImportance />
			</div>
		</div>
	);
}
