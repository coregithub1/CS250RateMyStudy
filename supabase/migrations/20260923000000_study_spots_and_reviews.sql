-- Run once in the Supabase SQL editor, or apply with the Supabase CLI.
create table public.study_spots (
  id text primary key,
  name text not null,
  image_url text not null,
  image_alt text not null
);
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  spot_id text not null references public.study_spots(id),
  user_id uuid not null references auth.users(id),
  rating integer not null check (rating between 1 and 5),
  comment text not null check (char_length(btrim(comment)) between 1 and 1000),
  created_at timestamptz not null default now()
);
create index reviews_spot_created_idx on public.reviews(spot_id, created_at desc);
alter table public.study_spots enable row level security;
alter table public.reviews enable row level security;
create policy "Anyone can read study spots" on public.study_spots for select to anon, authenticated using (true);
create policy "Anyone can read reviews" on public.reviews for select to anon, authenticated using (true);
create policy "Users can submit their own reviews" on public.reviews for insert to authenticated with check ((select auth.uid()) = user_id);
-- Only expose fields needed by the frontend; author IDs are not public.
revoke all on public.study_spots, public.reviews from anon, authenticated;
grant select on public.study_spots to anon, authenticated;
grant select (id, spot_id, rating, comment, created_at) on public.reviews to anon, authenticated;
grant insert (spot_id, user_id, rating, comment) on public.reviews to authenticated;
insert into public.study_spots (id, name, image_url, image_alt) values
  ('love-library', 'Love Library', 'https://upload.wikimedia.org/wikipedia/commons/2/20/LoveLibrarySDSUByPhilKonstantin.jpg', 'Exterior of Love Library at San Diego State University');
