import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.json()
    const email = formData.email
    const password = formData.password
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
        },
    })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: 'Check your email' }, { status: 200 })
}
