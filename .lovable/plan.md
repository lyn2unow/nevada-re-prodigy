

# Create `saved_lectures` Table

## Migration SQL

Create table `public.saved_lectures` with RLS scoped to the owning user:

```sql
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
```

### Notes
- `user_id` is marked `not null` to prevent RLS bypass via null values
- Single `FOR ALL` policy covers SELECT, INSERT, UPDATE, DELETE — all scoped to `auth.uid() = user_id`
- No code changes needed in this step — subsequent prompts will wire up the store and UI

