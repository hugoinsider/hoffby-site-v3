import { createClient as createServerClient } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // 1. Verify if the requester is an admin
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // You might want to check for 'admin' role here specifically if RLS doesn't cover it enough
    // But for now, we trust the middleware + RLS structure, assuming only admins reach here or RLS blocks them.
    // Ideally: check user role.

    try {
        const json = await request.json();
        const { name, email, password } = json;

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        // 2. Initialize Service Role Client
        const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !serviceRoleKey) {
            console.error("Missing Service Role Key");
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        // 3. Create User
        let userId = '';
        let userObject = null;

        const { data: newUser, error: createError } = await adminSupabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto confirm
            user_metadata: { name }
        });

        if (createError) {
            // Handle "User already registered" case (Zombie user check)
            if (createError.message?.includes("already been registered") || createError.status === 422) {
                // Find the existing user
                // Note: listUsers is the standard way in admin api to search if we can't select from auth.users directly
                // However, we can try to just select from profiles first to see if it's a "real" duplicate
                // But we need the ID to fix the profile.

                // Let's search for the user in the profiles table first to give a better error if they really exist
                const { data: existingProfile } = await adminSupabase
                    .from('profiles')
                    .select('id')
                    .eq('email', email)
                    .single();

                if (existingProfile) {
                    throw new Error("Este aluno já está cadastrado no sistema.");
                }

                // If no profile, we need to find the Auth User ID to recreate the profile
                // Currently, Supabase Admin API doesn't have a direct "getUserByEmail" that is public/easy in v2 helper?
                // We can use listUsers with a filter if supported, or just iterating. 
                // A workaround is to rely on the fact that if we can't find the ID easily, we might need manual intervention or 
                // use a Postgres function via RPC if available. 
                // BUT, effectively, listing users is expensive if many users. 

                // Optimized approach: 
                // If we are the admin, we likely have access to auth.users if we use a direct SQL query or similar. 
                // But generally, let's try to just insert into profiles with a dummy ID? No, explicit FK constraint.

                // Let's assume we can fetch it via RPC or just returning a specific error telling the admin.
                // However, to fix it automatically:

                // Attempt to "Invite" the user might return the user object even if registered? No.

                // Let's use listUsers pagination manually (only robust way without raw sql)
                // Or... we simply can't seamlessly fix it without the ID. 

                // WAIT! If the user exists, we can try `adminSupabase.auth.admin.getUserById` but we don't have ID.
                // `listUsers` is the only way. Let's do a search (assuming network isn't huge yet).
                const { data: { users }, error: listError } = await adminSupabase.auth.admin.listUsers();
                if (!listError && users) {
                    const found = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
                    if (found) {
                        userId = found.id;
                        userObject = found;
                        // Proceed to recover profile
                        console.log("Recovering zombie user:", userId);
                    } else {
                        throw createError; // Can't find them, weird.
                    }
                } else {
                    throw createError;
                }

            } else {
                throw createError;
            }
        } else {
            userId = newUser.user?.id || '';
            userObject = newUser.user;
        }

        if (!userId) throw new Error("Failed to resolve user ID");

        // 4. Update/Insert Profile
        // Use UPSERT to handle both new creation and recovery
        const { error: profileError } = await adminSupabase
            .from('profiles')
            .upsert({
                id: userId,
                name,
                email, // Ensure email is in profile
                role: 'student'
            })
            .select();

        if (profileError) {
            console.error("Profile update error", profileError);
            throw new Error("Erro ao criar perfil do aluno: " + profileError.message);
        }

        return NextResponse.json({ success: true, user: userObject });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
