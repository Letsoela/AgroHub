-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  seller_id uuid references auth.users(id) not null,
  name text not null,
  description text,
  price decimal(10,2) not null,
  quantity decimal(10,2) not null,
  unit text not null,
  category text not null,
  status text not null,
  image_url text
);

-- Orders table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  buyer_id uuid references auth.users(id) not null,
  seller_id uuid references auth.users(id) not null,
  product_id uuid references public.products(id) not null,
  quantity decimal(10,2) not null,
  total_price decimal(10,2) not null,
  status text not null,
  shipping_address text,
  tracking_number text
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- RLS Policies
create policy "Public read access"
on public.products for select
to public
using (true);

create policy "Sellers can create products"
on public.products for insert
to authenticated
using (auth.uid() = seller_id);

create policy "Sellers can update their products"
on public.products for update
to authenticated
using (auth.uid() = seller_id);

create policy "Users can read their orders"
on public.orders for select
to authenticated
using (
  auth.uid() = buyer_id or
  auth.uid() = seller_id
);

create policy "Buyers can create orders"
on public.orders for insert
to authenticated
using (auth.uid() = buyer_id);
