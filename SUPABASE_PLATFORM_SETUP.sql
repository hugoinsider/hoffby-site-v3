-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- COURSES Table
create table if not exists public.courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  slug text unique not null,
  cover_url text,
  price decimal(10, 2) default 0,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MODULES Table
create table if not exists public.modules (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  "order" integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- LESSONS Table
create table if not exists public.lessons (
  id uuid default uuid_generate_v4() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  title text not null,
  description text,
  video_url text, -- YouTube unlisted URL
  "order" integer not null default 0,
  is_free boolean default false, -- Preview available without purchase
  comments_enabled boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENROLLMENTS Table (Student access)
create table if not exists public.enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_id)
);

-- STUDENT_PROGRESS Table
create table if not exists public.student_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  is_completed boolean default false,
  last_watched_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id)
);

-- COMMENTS Table
create table if not exists public.comments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- LIKES Table
create table if not exists public.likes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id)
);

-- RLS POLICIES
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.student_progress enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;

-- Course Policies
-- Everyone can read published courses
create policy "Public courses are viewable by everyone" 
  on public.courses for select 
  using (is_published = true);

-- Admins (Professors) can do everything
-- Note: You'll need to define who is an "admin". 
-- For simplicity, assuming a specific flag in public.users or checking metadata.
-- HERE: We will effectively allow authenticated users to read everything for now, 
-- and restrict writing to specific users if needed, or open for this MVP step.
-- Ideally, create an 'admins' table or role mechanism.
-- For this setup: Authenticated users can read.
create policy "Authenticated can view courses"
  on public.courses for select
  to authenticated
  using (true);

create policy "Admins can insert/update/delete courses"
  on public.courses for all
  to authenticated
  using (auth.uid() in (select id from auth.users)); 
-- WARNING: The above policy is insecure for production (allows ANY auth user to edit). 
-- TODO: Replace with `auth.uid() = 'SPECIFIC_ADMIN_UUID'` or role check custom claim.


-- Module & Lesson Policies (Inherit access generally)
create policy "Modules viewable by everyone" on public.modules for select using (true);
create policy "Lessons viewable by everyone" on public.lessons for select using (true);

-- Enrollment Policies
create policy "Users can view their own enrollments" 
  on public.enrollments for select 
  using (auth.uid() = user_id);

-- Progress Policies
create policy "Users can manage their own progress" 
  on public.student_progress for all 
  using (auth.uid() = user_id);

-- Comment Policies
create policy "Users can view comments" on public.comments for select using (true);
create policy "Users can create comments" on public.comments for insert with check (auth.uid() = user_id);

-- Like Policies
create policy "Users can view likes" on public.likes for select using (true);
create policy "Users can toggle likes" on public.likes for all using (auth.uid() = user_id);
