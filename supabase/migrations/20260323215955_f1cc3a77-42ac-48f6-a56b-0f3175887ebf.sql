create table public.saved_lectures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  topics text[] not null default '{}',
  week_label text,
  duration_minutes integer,
  created_at timestamptz default now()
);

alter table public.saved_lectures enable row level security;

create policy "Users can manage their own saved lectures"
  on public.saved_lectures
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);