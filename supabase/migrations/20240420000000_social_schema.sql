-- Drop existing social tables if they exist
DROP TABLE IF EXISTS public.likes;
DROP TABLE IF EXISTS public.comments;
DROP TABLE IF EXISTS public.stories;
DROP TABLE IF EXISTS public.posts;

-- Create posts table
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  content text not null,
  media_url text[],
  post_type text check (post_type in ('update', 'offer', 'demand', 'news')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create comments table
create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.posts on delete cascade,
  user_id uuid references auth.users on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create likes table
create table public.likes (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.posts on delete cascade,
  user_id uuid references auth.users on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_id, user_id)
);

-- Create stories table
create table public.stories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  media_url text not null,
  caption text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone not null
);

-- Enable RLS
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.stories enable row level security;

-- Create RLS policies
create policy "Anyone can view posts" on public.posts
  for select using (true);

create policy "Users can create posts" on public.posts
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own posts" on public.posts
  for update using (auth.uid() = user_id);

create policy "Users can delete their own posts" on public.posts
  for delete using (auth.uid() = user_id);

create policy "Anyone can view comments" on public.comments
  for select using (true);

create policy "Users can create comments" on public.comments
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own comments" on public.comments
  for update using (auth.uid() = user_id);

create policy "Users can delete their own comments" on public.comments
  for delete using (auth.uid() = user_id);

create policy "Anyone can view likes" on public.likes
  for select using (true);

create policy "Users can create likes" on public.likes
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own likes" on public.likes
  for delete using (auth.uid() = user_id);

create policy "Anyone can view stories" on public.stories
  for select using (true);

create policy "Users can create stories" on public.stories
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own stories" on public.stories
  for delete using (auth.uid() = user_id);

-- Create indexes
create index posts_user_id_idx on public.posts(user_id);
create index comments_post_id_idx on public.comments(post_id);
create index comments_user_id_idx on public.comments(user_id);
create index likes_post_id_idx on public.likes(post_id);
create index likes_user_id_idx on public.likes(user_id);
create index stories_user_id_idx on public.stories(user_id);
create index stories_expires_at_idx on public.stories(expires_at);