import { supabase } from "./supabase";
import { Post, Comment, Story, Profile } from "./types/social";

export async function getProducts(category?: string) {
  let query = supabase.from("products").select(`
    *,
    seller:profiles(*)
  `);

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  return await query;
}

export async function createPost(post: Partial<Post>) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("Not authenticated");

  const postData = {
    content: post.content || "",
    media_url: post.media_url,
    post_type: post.post_type,
    user_id: user.user.id,
  };

  const { data, error } = await supabase
    .from("posts")
    .insert(postData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPosts() {
  const { data: postsData, error: postsError } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles (id, full_name, avatar_url, business_type),
      likes (count)
    `,
    )
    .order("created_at", { ascending: false });

  if (postsError) throw postsError;

  const transformedData =
    postsData?.map((post: any) => ({
      ...post,
      profile: {
        id: post.profiles?.id || "",
        full_name: post.profiles?.full_name || "",
        avatar_url: post.profiles?.avatar_url || "",
        business_type: post.profiles?.business_type || "consumer",
      } as Profile,
      likes_count: post.likes?.[0]?.count || 0,
    })) || [];

  return transformedData as Post[];
}

export async function getComments(postId: string) {
  const { data: commentsData, error: commentsError } = await supabase
    .from("comments")
    .select(
      `
      *,
      profiles (id, full_name, avatar_url, business_type)
    `,
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (commentsError) throw commentsError;

  const transformedData =
    commentsData?.map((comment: any) => ({
      ...comment,
      profile: {
        id: comment.profiles?.id || "",
        full_name: comment.profiles?.full_name || "",
        avatar_url: comment.profiles?.avatar_url || "",
        business_type: comment.profiles?.business_type || "consumer",
      } as Profile,
    })) || [];

  return transformedData as Comment[];
}

export async function createComment(comment: Partial<Comment>) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("Not authenticated");

  const commentData = {
    content: comment.content || "",
    post_id: comment.post_id,
    user_id: user.user.id,
  };

  const { data, error } = await supabase
    .from("comments")
    .insert(commentData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getStories() {
  const { data: storiesData, error: storiesError } = await supabase
    .from("stories")
    .select(
      `
      *,
      profiles (id, full_name, avatar_url, business_type)
    `,
    )
    .gte("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false });

  if (storiesError) throw storiesError;

  const transformedData =
    storiesData?.map((story: any) => ({
      ...story,
      profile: {
        id: story.profiles?.id || "",
        full_name: story.profiles?.full_name || "",
        avatar_url: story.profiles?.avatar_url || "",
        business_type: story.profiles?.business_type || "consumer",
      } as Profile,
    })) || [];

  return transformedData as Story[];
}

export async function createStory(story: Partial<Story>) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("Not authenticated");

  const storyData = {
    media_url: story.media_url || "",
    caption: story.caption,
    expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    user_id: user.user.id,
  };

  const { data, error } = await supabase
    .from("stories")
    .insert(storyData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function toggleLike(postId: string) {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) throw new Error("Not authenticated");

  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.user.id)
    .single();

  if (existingLike) {
    await supabase.from("likes").delete().eq("id", existingLike.id);
    return false;
  } else {
    await supabase
      .from("likes")
      .insert([{ post_id: postId, user_id: user.user.id }]);
    return true;
  }
}
