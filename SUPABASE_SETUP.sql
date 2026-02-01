-- Create the table for Boost Leads
create table if not exists boost_leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  full_name text,
  phone text,
  resume_data jsonb,
  status text default 'captured', -- captured, pending_payment, active, cancelled
  asaas_customer_id text,
  asaas_subscription_id text
);

-- Add a unique constraint on email to prevent duplicates if desired (optional, upsert relies on it)
alter table boost_leads add constraint boost_leads_email_key unique (email);

-- Enable Row Level Security (RLS)
alter table boost_leads enable row level security;

-- Create a policy that allows the API (server) to insert/update.
-- Since we use the service role or anon key in different contexts, 
-- for the public API to write to it using anon key (if not using service role bypass), 
-- we need to allow inserts for 'anon' or 'public'.
-- HOWEVER: The 'supabase-server' utility often uses the context of the request. 
-- If the user isn't logged in, they are 'anon'.

create policy "Enable insert for everyone" on boost_leads
  for insert with check (true);

create policy "Enable update for everyone" on boost_leads
  for update using (true);
  
-- Ideally, you'd restrict 'update' and 'select' to only the service role or the owner,
-- but for this lead capture flow, allowing insert is crucial.

-- If you are using service_role key for the API, RLS is bypassed automatically. 
-- But typically createServerClient uses the key from env which is usually ANON key.

-- Create the table for Coupons
create table if not exists coupons (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  code text not null,
  discount_percent integer not null check (discount_percent >= 0 and discount_percent <= 100),
  max_uses integer, -- null means unlimited
  current_uses integer default 0,
  active boolean default true
);

-- Unique constraint for code
alter table coupons add constraint coupons_code_key unique (code);

-- Enable RLS for Coupons
alter table coupons enable row level security;

-- Policies for Coupons
create policy "Enable read for everyone" on coupons
  for select using (true);

-- Create the table for Coupon Usages (History)
create table if not exists coupon_usages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  coupon_id uuid references coupons(id) not null,
  metadata jsonb -- store ip or other details
);

-- Enable RLS for Coupon Usages
alter table coupon_usages enable row level security;

-- Policies for Coupon Usages
create policy "Enable insert for everyone" on coupon_usages
  for insert with check (true);
