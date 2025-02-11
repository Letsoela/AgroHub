-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.transactions;
DROP TABLE IF EXISTS public.demands;
DROP TABLE IF EXISTS public.orders;
DROP TABLE IF EXISTS public.products;
DROP TABLE IF EXISTS public.profiles;

-- Enable RLS
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  user_id uuid references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  business_type text check (business_type in ('farmer', 'distributor', 'retailer', 'consumer')),
  business_name text,
  location text,
  email text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create products table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  description text,
  category text not null,
  price_per_unit decimal not null,
  quantity decimal not null,
  unit text not null,
  location text,
  available_from timestamp with time zone not null,
  available_until timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create orders table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products on delete cascade,
  buyer_id uuid references auth.users on delete cascade,
  seller_id uuid references auth.users on delete cascade,
  quantity decimal not null,
  total_price decimal not null,
  status text not null check (status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address text,
  tracking_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create demands table
create table public.demands (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  product_category text not null,
  quantity_needed decimal not null,
  unit text not null,
  price_range_min decimal,
  price_range_max decimal,
  needed_by timestamp with time zone not null,
  location text,
  status text check (status in ('open', 'in_progress', 'fulfilled', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create transactions table
create table public.transactions (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products on delete cascade,
  demand_id uuid references public.demands on delete cascade,
  seller_id uuid references profiles(id),
  buyer_id uuid references profiles(id),
  logistics_id uuid references profiles(id),
  quantity decimal not null,
  unit text not null,
  price_per_unit decimal not null,
  status text check (status in ('pending', 'confirmed', 'in_transit', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.demands enable row level security;
alter table public.transactions enable row level security;

-- Create RLS policies
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = user_id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = user_id);

create policy "Anyone can view products" on public.products
  for select using (true);

create policy "Users can create products" on public.products
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own products" on public.products
  for update using (auth.uid() = user_id);

create policy "Users can view their orders" on public.orders
  for select using (auth.uid() in (buyer_id, seller_id));

create policy "Users can create orders" on public.orders
  for insert with check (auth.uid() = buyer_id);

create policy "Anyone can view demands" on public.demands
  for select using (true);

create policy "Users can create demands" on public.demands
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own demands" on public.demands
  for update using (auth.uid() = user_id);

create policy "Users can view their transactions" on public.transactions
  for select using (auth.uid() in (
    select user_id from profiles where id in (seller_id, buyer_id, logistics_id)
  ));

-- Create functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, user_id, full_name, avatar_url, business_type, email)
  values (
    new.id,
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar',
    new.raw_user_meta_data->>'role',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create indexes
create index products_user_id_idx on public.products(user_id);
create index products_category_idx on public.products(category);
create index orders_buyer_id_idx on public.orders(buyer_id);
create index orders_seller_id_idx on public.orders(seller_id);
create index demands_user_id_idx on public.demands(user_id);
create index demands_product_category_idx on public.demands(product_category);
create index transactions_product_id_idx on public.transactions(product_id);
create index transactions_demand_id_idx on public.transactions(demand_id);