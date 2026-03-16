import { Badge, CodeBlock } from "@/shared/ui";

import { SCHEMA_CODE, TYPES_CODE } from "../model";

export function ZodPattern() {
	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">
					02
				</span>
				Integrated Pattern (Schema + Types)
			</h2>
			<div className="grid gap-6">
				<div className="space-y-4">
					<Badge variant="secondary">Schema Definition</Badge>
					<CodeBlock
						filename="schema/account.schema.ts"
						language="typescript"
						code={SCHEMA_CODE}
					/>
				</div>
				<div className="space-y-4">
					<Badge variant="secondary">Type Extraction</Badge>
					<CodeBlock
						filename="types/account.types.ts"
						language="typescript"
						code={TYPES_CODE}
					/>
				</div>
			</div>
		</section>
	);
}
