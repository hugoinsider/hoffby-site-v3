import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const json = await request.json();
        const { items } = json; // Array of { id, order }

        if (!Array.isArray(items)) {
            return NextResponse.json({ error: 'Items array required' }, { status: 400 });
        }

        // Upsert or bulk update logic
        // Supabase upsert requires all columns usually or primary key match
        // We only want to update 'order'.
        // Simplest way for now: Loop (inefficient but safe for small MVP) or SQL RPC.
        // We'll use upsert with specific columns if possible, but 'order' update requires identifying the row.
        // Let's use Promise.all for now as courses usually have < 50 modules.

        // Better: upsert with { id, order, course_id? } - need to be careful not to overwrite other fields if missing.
        // Safe approach: RPC. But I can't write RPC easily here without SQL access.
        // Fallback: Loop.

        const updates = items.map(async (item: any) => {
            return supabase
                .from('modules')
                .update({ order: item.order })
                .eq('id', item.id);
        });

        await Promise.all(updates);

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
