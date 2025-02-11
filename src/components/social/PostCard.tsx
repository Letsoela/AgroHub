import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MapPin,
  MoreVertical,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";
import { Post } from "@/lib/types/social";
import { toggleLike } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import CommentSection from "./CommentSection";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      const liked = await toggleLike(post.id);
      setIsLiked(liked);
      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleShare = () => {
    // Implement share functionality
  };

  return (
    <Card className="p-6 space-y-4 bg-white">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.avatar_url} alt={post.full_name} />
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">{post.full_name}</h3>
              <Badge variant="secondary">{post.business_type}</Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{formatDistanceToNow(new Date(post.created_at))} ago</span>
              {post.location && (
                <>
                  <span className="mx-1">•</span>
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{post.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save Post</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <p className="text-gray-700">{post.content}</p>

        {post.media_urls && post.media_urls.length > 0 && (
          <div className="grid grid-cols-1 gap-2 rounded-lg overflow-hidden">
            {post.media_urls.map((url, index) => (
              <div key={index} className="relative pt-[56.25%]">
                {post.media_type === "image" && (
                  <img
                    src={url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {post.media_type === "video" && (
                  <video
                    src={url}
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          className={isLiked ? "text-red-500" : ""}
          onClick={handleLike}
        >
          <Heart className="h-5 w-5 mr-1" />
          {likesCount}
        </Button>

        <Button variant="ghost" size="sm" onClick={() => setShowComments(true)}>
          <MessageCircle className="h-5 w-5 mr-1" />
          {post.comments_count || 0}
        </Button>

        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="h-5 w-5 mr-1" />
          Share
        </Button>
      </div>

      {/* Comments Dialog */}
      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent className="max-w-2xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          <CommentSection postId={post.id} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PostCard;
