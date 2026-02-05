-- Create Profiles table
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  role text default 'student' check (role in ('admin', 'student')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Toggle RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone" 
  on public.profiles for select 
  using (true);

create policy "Users can insert their own profile" 
  on public.profiles for insert 
  with check (auth.uid() = id);

create policy "Users can update own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'student'); -- Default to student
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists to avoid duplication errors on re-run
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- UPDATE EXISTING POLICIES TO USE ROLES
-- First, drop the insecure one
drop policy if exists "Admins can insert/update/delete courses" on public.courses;

-- Create secure policy for Admins only
create policy "Admins can insert/update/delete courses"
  on public.courses for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Update Modules/Lessons to be admin-only for edits
drop policy if exists "Modules viewable by everyone" on public.modules; -- Re-create with same name or split?
-- Actually the previous policies were just "Using true" for select.
-- We want only admins to INSERT/UPDATE/DELETE.
create policy "Admins can manage modules"
  on public.modules for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
  
create policy "Everyone can view modules"
  on public.modules for select
  using (true);

-- Same for Lessons
create policy "Admins can manage lessons"
  on public.lessons for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
  
create policy "Everyone can view lessons"
  on public.lessons for select
  using (true);
