import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, FileText, Video, X } from "lucide-react";
import { createPost, supabase } from "@/lib/supabase";
import MediaPreview from "./MediaPreview";

interface CreatePostProps {
  onPostCreated?: () => void;
}

type MediaType = "image" | "video" | "pdf";

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState<MediaType | null>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMedia([file]); // Only allow one file at a time
    }
  };

  const removeMedia = () => {
    setMedia([]);
    setSelectedType(null);
  };

  const handleSubmit = async () => {
    if (!content.trim() && media.length === 0) return;

    try {
      setIsSubmitting(true);

      // Upload media if any
      let mediaUrls = [];
      if (media.length > 0) {
        const file = media[0];
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from("posts")
          .upload(fileName, file);

        if (error) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from("posts").getPublicUrl(fileName);

        mediaUrls.push(publicUrl);
      }

      // Create post
      await createPost({
        content: content.trim(),
        media_urls: mediaUrls,
        media_type: selectedType || null,
      });

      // Reset form
      setContent("");
      setMedia([]);
      setSelectedType(null);
      onPostCreated?.();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTypeSelect = (type: MediaType) => {
    setSelectedType(type);
    const input = document.getElementById("media-upload");
    if (input) {
      switch (type) {
        case "image":
          input.setAttribute("accept", "image/*");
          break;
        case "video":
          input.setAttribute("accept", "video/*");
          break;
        case "pdf":
          input.setAttribute("accept", ".pdf");
          break;
      }
      input.click();
    }
  };

  return (
    <Card className="p-4 bg-white">
      <Textarea
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] mb-4"
      />

      {media.length > 0 && (
        <div className="mb-4">
          <MediaPreview file={media[0]} onRemove={removeMedia} />
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleTypeSelect("image")}
            disabled={media.length > 0}
          >
            <ImagePlus className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleTypeSelect("video")}
            disabled={media.length > 0}
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleTypeSelect("pdf")}
            disabled={media.length > 0}
          >
            <FileText className="h-5 w-5" />
          </Button>
          <input
            id="media-upload"
            type="file"
            className="hidden"
            onChange={handleMediaChange}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || (!content.trim() && media.length === 0)}
        >
          Post
        </Button>
      </div>
    </Card>
  );
};

export default CreatePost;
