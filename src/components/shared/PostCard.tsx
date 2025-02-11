import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileText, Image as ImageIcon, FileVideo } from "lucide-react";
import PostActions from "./PostActions";
import { Document, Page } from "react-pdf";

interface Post {
  id: string;
  content: string;
  media_url: string[];
  media_type: "image" | "video" | "pdf" | null;
  created_at: string;
  profiles: {
    full_name: string;
    business_type: string;
    avatar_url: string;
  };
  likes: { count: number }[];
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
  const getMediaIcon = (type: Post["media_type"]) => {
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
            src={post.profiles.avatar_url}
            alt={post.profiles.full_name}
            className="object-cover"
          />
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">
              {post.profiles.full_name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {post.profiles.business_type}
            </Badge>
            <span className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>

          <p className="mt-2 text-gray-600">{post.content}</p>

          {post.media_url && post.media_url.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {post.media_url.map((url, index) => (
                <div key={index} className="relative group">
                  {post.media_type === "image" && (
                    <img
                      src={url}
                      alt=""
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  )}
                  {post.media_type === "video" && (
                    <video
                      src={url}
                      controls
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  )}
                  {post.media_type === "pdf" && (
                    <Document
                      file={url}
                      className="rounded-lg w-full h-48 overflow-hidden"
                    >
                      <Page
                        pageNumber={1}
                        width={300}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </Document>
                  )}
                </div>
              ))}
            </div>
          )}

          <PostActions
            likes={post.likes[0]?.count || 0}
            comments={0}
            shares={0}
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
