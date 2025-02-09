import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Image as ImageIcon, FileVideo } from "lucide-react";
import PostActions from "./PostActions";

export interface MediaItem {
  type: "image" | "video" | "pdf";
  url: string;
  thumbnail?: string;
}

export interface Post {
  id: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  media?: MediaItem[];
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  tags?: string[];
}

interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

const PostCard = ({
  post,
  onLike = () => {},
  onComment = () => {},
  onShare = () => {},
}: PostCardProps) => {
  const getMediaIcon = (type: MediaItem["type"]) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6" />;
      case "video":
        return <FileVideo className="h-6 w-6" />;
      default:
        return <ImageIcon className="h-6 w-6" />;
    }
  };

  return (
    <Card className="p-6 bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <Avatar className="h-12 w-12">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="object-cover"
          />
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {post.author.role}
            </Badge>
            <span className="text-sm text-gray-500">{post.timestamp}</span>
          </div>

          <p className="mt-2 text-gray-600">{post.content}</p>

          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {post.media && post.media.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {post.media.map((item, index) => (
                <div key={index} className="relative group">
                  {item.type === "image" && (
                    <img
                      src={item.url}
                      alt=""
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  )}
                  {item.type === "video" && (
                    <video
                      src={item.url}
                      controls
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  )}
                  {item.type === "pdf" && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-48 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <div className="text-center">
                        <FileText className="h-12 w-12 mx-auto text-gray-500" />
                        <span className="mt-2 text-sm text-gray-600">
                          View PDF
                        </span>
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          <PostActions
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
          />
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
