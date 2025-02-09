export type UserRole = "farmer" | "distributor" | "retailer" | "consumer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  company?: string;
  location?: string;
  bio?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
