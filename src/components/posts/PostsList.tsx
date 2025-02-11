import React, { useEffect, useState } from "react";
import { getPosts } from "@/lib/supabase";
import PostCard from "@/components/shared/PostCard";
import { Post } from "@/lib/types";

interface PostsListProps {
  refreshTrigger?: number;
}

const PostsList = ({ refreshTrigger = 0 }: PostsListProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        // First try to get posts from the API
        const { data, error } = await getPosts();
        if (error) {
          console.error("Error loading posts from API:", error);
          // If API fails, use mock data
          import("@/lib/mockData").then(({ mockPosts }) => {
            setPosts(mockPosts);
            setLoading(false);
          });
          return;
        }
        setPosts(data || []);
      } catch (error) {
        console.error("Error loading posts:", error);
        // Fallback to mock data
        import("@/lib/mockData").then(({ mockPosts }) => {
          setPosts(mockPosts);
        });
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
