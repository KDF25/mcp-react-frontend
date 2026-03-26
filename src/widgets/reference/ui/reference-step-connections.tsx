import { getTranslations } from "next-intl/server";

import { Badge, CodeBlock, SectionTitle } from "@/shared/ui";

import {
	REFERENCE_CODE_HTTP,
	REFERENCE_CODE_REMOTE_ONRENDER,
	REFERENCE_CODE_REMOTE_VERCEL,
	REFERENCE_CODE_STDIO
} from "../model";

export async function ReferenceStepConnections() {
	const t = await getTranslations("reference");

	return (
		<section className="space-y-6 pt-4 border-t border-border/40">
			<SectionTitle badge="01" className="text-xl mb-2">
				{t("connections.title")}
			</SectionTitle>

			<div className="space-y-6">
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Badge variant="outline">
							{t("connections.stdio.label")}
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">
						{t("connections.stdio.text")}
					</p>
					<CodeBlock
						filename="mcp_config.json (Local Stdio)"
						language="json"
						code={REFERENCE_CODE_STDIO}
					/>
				</div>

				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Badge variant="outline">
							{t("connections.http.label")}
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">
						{t("connections.http.text")}
					</p>
					<CodeBlock
						filename="mcp_config.json (Local HTTP)"
						language="json"
						code={REFERENCE_CODE_HTTP}
					/>
				</div>

				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<Badge variant="outline">
							{t("connections.remote.label")}
						</Badge>
					</div>
					<p className="text-sm text-muted-foreground">
						{t("connections.remote.text")}
					</p>
					<CodeBlock
						filename="mcp_config.json (Vercel)"
						language="json"
						code={REFERENCE_CODE_REMOTE_VERCEL}
					/>
					<CodeBlock
						filename="mcp_config.json (OnRender)"
						language="json"
						code={REFERENCE_CODE_REMOTE_ONRENDER}
					/>
				</div>
			</div>
		</section>
	);
}
