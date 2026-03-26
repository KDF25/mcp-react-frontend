import { NextResponse } from "next/server";

import { RulesProvider } from "@/entities/rules/lib/rules-provider";

export async function GET() {
	return NextResponse.json(RulesProvider.getRules());
}
