export type UserRole =
  | "farmer"
  | "distributor"
  | "retailer"
  | "logistics"
  | "consumer";

export type PostType = "update" | "offer" | "demand" | "news";

export interface Profile {
  id: string;
  username?: string;
  full_name: string;
  avatar_url: string;
  business_type: UserRole;
  business_name?: string;
  location?: string;
  bio?: string;
  website?: string;
  email?: string;
  phone?: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  media_url?: string[];
  media_type?: "image" | "video" | "pdf" | null;
  post_type?: PostType;
  location?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  profile?: Profile;
  likes_count?: number;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Story {
  id: string;
  user_id: string;
  media_url: string;
  caption?: string;
  location?: string;
  created_at: string;
  expires_at: string;
  profile?: Profile;
}
