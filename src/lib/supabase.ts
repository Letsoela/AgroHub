import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = "https://okpbkvbtoaylthufxvzj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rcGJrdmJ0b2F5bHRodWZ4dnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5Mzc5NjUsImV4cCI6MjA1NDUxMzk2NX0.1ITDZqXV7yk0uIiGqqRW7C9hiClRcgLRnZSo2YjS54s";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function signInWithEmail(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(
  email: string,
  password: string,
  metadata: {
    name: string;
    role: string;
    avatar: string;
  },
) {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function createProduct(productData: any) {
  return await supabase.from("products").insert([productData]).select();
}

export async function getProducts(category?: string) {
  let query = supabase.from("products").select("*");

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  return await query;
}

export async function createOrder(orderData: any) {
  return await supabase.from("orders").insert([orderData]).select();
}

export async function getOrders(userId: string) {
  return await supabase
    .from("orders")
    .select("*")
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`);
}
