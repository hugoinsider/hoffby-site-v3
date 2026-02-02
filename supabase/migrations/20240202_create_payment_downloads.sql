-- Create table to track download limits
create table if not exists public.payment_downloads (
    id uuid not null default gen_random_uuid (),
    payment_id text not null,
    download_count integer not null default 0,
    max_downloads integer not null default 1,
    created_at timestamp with time zone not null default now(),
    last_download_at timestamp with time zone null,
    constraint payment_downloads_pkey primary key (id),
    constraint payment_downloads_payment_id_key unique (payment_id)
);

-- Enable RLS (Optional, but good practice. Since we access via server key, it bypasses RLS, but if we used client key it would need policy)
alter table public.payment_downloads enable row level security;

-- Policy: Allow read/update only if we decide to expose this (currently handled server-side)
-- For now, we can leave RLS enabled but no policies if only server accesses it with service role/server logic.
-- Actually, createClient in supabase-server uses cookie store, likely anon key.
-- So we might need a policy if we access it via anon key?
-- Wait, `supabase-server.ts` uses `process.env.SUPABASE_ANON_KEY`. 
-- So we need RLS policies to allow operations?
-- OR: `route.ts` is server-side. It should use `SUPABASE_SERVICE_ROLE_KEY` if we want to bypass RLS, 
-- or we need policies allowing public insert/update (bad idea).
-- BETTER: Use Service Role Key for the API route actions to secure this table.
-- I will assume `SUPABASE_SERVICE_ROLE_KEY` is available or I should add it.
