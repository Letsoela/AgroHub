import React from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, FileText, Video, X } from "lucide-react";

interface MediaUploadProps {
  media: File[];
  onMediaChange: (media: File[]) => void;
}

const MediaUpload = ({ media, onMediaChange }: MediaUploadProps) => {
  const handleFileSelect = (type: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onMediaChange([file]);
      }
    };
    input.click();
  };

  const removeMedia = () => {
    onMediaChange([]);
  };

  return (
    <div className="space-y-4">
      {media.length > 0 ? (
        <div className="relative group">
          {media[0].type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(media[0])}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          {media[0].type.startsWith("video/") && (
            <video
              src={URL.createObjectURL(media[0])}
              className="w-full h-48 object-cover rounded-lg"
              controls
            />
          )}
          {media[0].type === "application/pdf" && (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={removeMedia}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleFileSelect("image/*")}
          >
            <ImagePlus className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleFileSelect("video/*")}
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleFileSelect(".pdf")}
          >
            <FileText className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
