import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const newRules = await request.json();

        // В реальном приложении здесь была бы логика сохранения в Redis/DB или перезапись JSON
        // Пока просто имитируем успех
        console.log('Updating rules:', newRules);

        return NextResponse.json({ status: 'success', message: 'Rules updated successfully' });
    } catch (error) {
        return NextResponse.json({ status: 'error', message: 'Failed to update rules' }, { status: 400 });
    }
}
