import { NextResponse } from 'next/server';
import defaultRules from '@/entities/rules/config/default-rules.json';

export async function GET() {
    return NextResponse.json(defaultRules);
}
