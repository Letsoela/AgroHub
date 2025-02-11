export type UserRole = "farmer" | "distributor" | "retailer" | "consumer";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price_per_unit: number;
  quantity: number;
  unit: string;
  location?: string;
  available_from: string;
  available_until?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
    business_type: string;
  };
}

export interface Order {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  quantity: number;
  total_price: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  shipping_address?: string;
  tracking_number?: string;
  created_at: string;
  products?: Product;
  buyer?: Profile;
  seller?: Profile;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url: string;
  business_type: UserRole;
  business_name?: string;
  location?: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}
