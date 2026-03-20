create table public.user_settings (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);
alter table public.user_settings enable row level security;
create policy "Auth select" on public.user_settings for select to authenticated using (true);
create policy "Auth insert" on public.user_settings for insert to authenticated with check (true);
create policy "Auth update" on public.user_settings for update to authenticated using (true) with check (true);