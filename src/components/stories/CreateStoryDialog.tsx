import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";
import { createStory } from "@/lib/api";

interface CreateStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const CreateStoryDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: CreateStoryDialogProps) => {
  const [media, setMedia] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!media) return;

    try {
      setIsSubmitting(true);

      // TODO: Implement media upload to storage
      // For now, we'll use a placeholder URL
      const mediaUrl = URL.createObjectURL(media);

      await createStory({
        media_url: mediaUrl,
        caption: caption.trim() || null,
      });

      onSuccess?.();
      onOpenChange(false);
      setMedia(null);
      setCaption("");
    } catch (error) {
      console.error("Error creating story:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Story</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {media ? (
            <div className="relative aspect-[9/16] rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(media)}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setMedia(null)}
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="aspect-[9/16] border-2 border-dashed rounded-lg flex items-center justify-center">
              <label className="cursor-pointer flex flex-col items-center">
                <ImagePlus className="h-8 w-8 mb-2" />
                <span>Upload Media</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Input
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption to your story..."
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={!media || isSubmitting}
          >
            Share Story
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStoryDialog;
