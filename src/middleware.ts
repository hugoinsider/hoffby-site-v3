
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Check if we are in the customer area OR platform area (excluding login)
    // Check if we are in the customer area OR platform area (excluding login and auth api)
    if (request.nextUrl.pathname.startsWith('/area-do-cliente') ||
        (request.nextUrl.pathname.startsWith('/plataforma') && !request.nextUrl.pathname.startsWith('/plataforma/login')) ||
        (request.nextUrl.pathname.startsWith('/api/plataforma') && !request.nextUrl.pathname.startsWith('/api/plataforma/auth'))) {
        const supabaseUrl = process.env.SUPABASE_URL || '';
        const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

        const supabase = createServerClient(
            supabaseUrl,
            supabaseKey,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            request.cookies.set(name, value)
                            response.cookies.set(name, value, options)
                        })
                    },
                },
            }
        )

        const {
            data: { user },
        } = await supabase.auth.getUser()

        // If not logged in, redirect to appropriate login
        if (!user) {
            // If it's an API call, return 401 instead of redirecting
            if (request.nextUrl.pathname.startsWith('/api')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            if (request.nextUrl.pathname.startsWith('/plataforma')) {
                return NextResponse.redirect(new URL('/plataforma/login', request.url))
            }
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return response
}

export const config = {
    matcher: [
        '/area-do-cliente/:path*',
        '/plataforma/:path*',
        '/api/plataforma/:path*',
    ],
}
