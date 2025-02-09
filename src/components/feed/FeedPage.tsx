import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import StoriesBar from "../stories/StoriesBar";
import PostCard from "../shared/PostCard";
import SmartWidgets from "../shared/SmartWidgets";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ImagePlus, FileText, Video } from "lucide-react";

const defaultPosts = [
  {
    id: "1",
    author: {
      name: "Sarah Johnson",
      role: "Organic Farmer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    content:
      "Just harvested our first batch of hydroponic lettuce! 🥬 The new vertical farming system is showing amazing results. Check out the yield metrics in the attached report.",
    media: [
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1595856619767-ab951ca3b8c7?w=800",
      },
    ],
    timestamp: "2 hours ago",
    likes: 45,
    comments: 12,
    shares: 8,
    tags: ["hydroponics", "sustainablefarming", "agtech"],
  },
  {
    id: "2",
    author: {
      name: "Fresh Market Co",
      role: "Distributor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FreshMarket",
    },
    content:
      "Looking for premium quality organic vegetables for our new store chain. Farmers in the Western Cape region, let's connect! 🌿",
    timestamp: "4 hours ago",
    likes: 32,
    comments: 15,
    shares: 5,
    tags: ["organicproduce", "businessopportunity", "localfarmers"],
  },
  {
    id: "3",
    author: {
      name: "Tech Farm Solutions",
      role: "AgTech Provider",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechFarm",
    },
    content:
      "Excited to announce our new AI-powered irrigation system! Join our webinar next week to learn how it can reduce water usage by 40%. 🌱💧",
    media: [
      {
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=800",
      },
    ],
    timestamp: "6 hours ago",
    likes: 89,
    comments: 24,
    shares: 31,
    tags: ["agtech", "smartfarming", "sustainability"],
  },
];

const FeedPage = () => {
  const handleLike = (postId: string) => {
    // Handle like action
    console.log("Liked post:", postId);
  };

  const handleComment = (postId: string) => {
    // Handle comment action
    console.log("Comment on post:", postId);
  };

  const handleShare = (postId: string) => {
    // Handle share action
    console.log("Shared post:", postId);
  };
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-6">
          <StoriesBar />

          {/* Post Creation */}
          <div className="bg-white rounded-lg p-4 space-y-4">
            <Input
              placeholder="Share updates, insights, or market trends..."
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Image
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Document
                </Button>
              </div>
              <Button>Post</Button>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {defaultPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={() => handleLike(post.id)}
                onComment={() => handleComment(post.id)}
                onShare={() => handleShare(post.id)}
              />
            ))}
          </div>
        </div>

        {/* Widgets Column */}
        <div className="lg:col-span-4 space-y-6">
          <SmartWidgets />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
