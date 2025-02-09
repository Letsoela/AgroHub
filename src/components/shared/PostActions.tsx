import React from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  Award,
  Smile,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostActionsProps {
  likes: number;
  comments: number;
  shares: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  userReaction?: string;
}

const reactions = [
  {
    icon: <ThumbsUp className="h-4 w-4" />,
    label: "Like",
    color: "text-blue-500",
  },
  {
    icon: <Award className="h-4 w-4" />,
    label: "Celebrate",
    color: "text-yellow-500",
  },
  { icon: <Heart className="h-4 w-4" />, label: "Love", color: "text-red-500" },
  {
    icon: <Smile className="h-4 w-4" />,
    label: "Insightful",
    color: "text-green-500",
  },
];

const PostActions = ({
  likes,
  comments,
  shares,
  onLike,
  onComment,
  onShare,
  userReaction,
}: PostActionsProps) => {
  return (
    <div className="flex items-center justify-between border-t pt-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`text-gray-600 hover:text-blue-500 ${userReaction ? "text-blue-500" : ""}`}
          >
            <ThumbsUp className="h-5 w-5 mr-1" />
            {likes}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <div className="flex p-2 gap-2">
            {reactions.map((reaction) => (
              <Button
                key={reaction.label}
                variant="ghost"
                size="sm"
                className={`p-2 hover:${reaction.color}`}
                onClick={onLike}
              >
                {reaction.icon}
              </Button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-blue-500"
        onClick={onComment}
      >
        <MessageCircle className="h-5 w-5 mr-1" />
        {comments}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="text-gray-600 hover:text-green-500"
        onClick={onShare}
      >
        <Share2 className="h-5 w-5 mr-1" />
        {shares}
      </Button>
    </div>
  );
};

export default PostActions;
