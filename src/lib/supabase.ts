import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth functions
export async function signInWithEmail(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(
  email: string,
  password: string,
  metadata: any,
) {
  return await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata },
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

// Products
export async function createProduct(productData: any) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  return await supabase
    .from("products")
    .insert([{ ...productData, user_id: user.id }])
    .select();
}

export async function getProducts(category?: string) {
  let query = supabase.from("products").select(`
      *,
      profiles(*)
    `);

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  return await query;
}

// Orders
export async function createOrder(orderData: any) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  return await supabase
    .from("orders")
    .insert([{ ...orderData, buyer_id: user.id }])
    .select();
}

export async function getOrders() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  return await supabase.from("orders").select(`
      *,
      products(*),
      buyer:profiles(*),
      seller:profiles(*)
    `);
}

// Social
export async function createPost(postData: any) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  return await supabase
    .from("posts")
    .insert([{ ...postData, user_id: user.id }])
    .select();
}

export async function getPosts() {
  return await supabase
    .from("posts")
    .select(
      `
      *,
      profiles(*),
      likes(count)
    `,
    )
    .order("created_at", { ascending: false });
}

export async function createComment(commentData: any) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  return await supabase
    .from("comments")
    .insert([{ ...commentData, user_id: user.id }])
    .select();
}

export async function getComments(postId: string) {
  return await supabase
    .from("comments")
    .select(
      `
      *,
      profiles(*)
    `,
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
}

export async function createStory(storyData: any) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  return await supabase
    .from("stories")
    .insert([
      {
        ...storyData,
        user_id: user.id,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    ])
    .select();
}

export async function getStories() {
  return await supabase
    .from("stories")
    .select(
      `
      *,
      profiles(*)
    `,
    )
    .gte("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false });
}

export async function toggleLike(postId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .single();

  if (existingLike) {
    await supabase.from("likes").delete().eq("id", existingLike.id);
    return false;
  } else {
    await supabase
      .from("likes")
      .insert([{ post_id: postId, user_id: user.id }]);
    return true;
  }
}
