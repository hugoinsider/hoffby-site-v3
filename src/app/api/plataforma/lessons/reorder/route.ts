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

        const updates = items.map(async (item: any) => {
            return supabase
                .from('lessons')
                .update({ order: item.order })
                .eq('id', item.id);
        });

        await Promise.all(updates);

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
