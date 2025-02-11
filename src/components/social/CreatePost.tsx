import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, FileText, Video, MapPin } from "lucide-react";
import { createPost } from "@/lib/api";
import { PostType } from "@/lib/types/social";
import MediaUpload from "./MediaUpload";

interface CreatePostProps {
  onPostCreated?: () => void;
}

const POST_TYPES: { value: PostType; label: string }[] = [
  { value: "update", label: "General Update" },
  { value: "offer", label: "Product Offer" },
  { value: "demand", label: "Product Request" },
  { value: "news", label: "Industry News" },
];

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState<PostType>("update");
  const [location, setLocation] = useState("");
  const [media, setMedia] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      setIsSubmitting(true);

      // Upload media if any
      let mediaUrls: string[] = [];
      if (media.length > 0) {
        // Handle media upload
        // ... (media upload logic)
      }

      await createPost({
        content: content.trim(),
        post_type: postType,
        location: location || null,
        media_urls: mediaUrls,
        media_type:
          media.length > 0 ? (media[0].type.split("/")[0] as any) : null,
      });

      setContent("");
      setPostType("update");
      setLocation("");
      setMedia([]);
      onPostCreated?.();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-4 space-y-4 bg-white">
      <div className="flex gap-4">
        <Select
          value={postType}
          onValueChange={(v) => setPostType(v as PostType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Post type" />
          </SelectTrigger>
          <SelectContent>
            {POST_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Add location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          />
          <MapPin className="h-4 w-4 absolute left-2 top-3 text-muted-foreground" />
        </div>
      </div>

      <Textarea
        placeholder="Share your thoughts, products, or requirements..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />

      <MediaUpload media={media} onMediaChange={setMedia} />

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !content.trim()}
        >
          Post
        </Button>
      </div>
    </Card>
  );
};

export default CreatePost;
