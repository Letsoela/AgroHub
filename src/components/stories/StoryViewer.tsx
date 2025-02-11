import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Story } from "@/lib/types/social";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StoryViewer = ({
  stories,
  initialStoryIndex,
  open,
  onOpenChange,
}: StoryViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story
          if (currentIndex < stories.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            return 0;
          } else {
            clearInterval(timer);
            onOpenChange(false);
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentIndex, open]);

  const currentStory = stories[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-black">
        <div className="relative h-[80vh]">
          {/* Progress bars */}
          <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
            {stories.map((_, index) => (
              <div
                key={index}
                className="h-1 flex-1 bg-gray-600 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width: `${index === currentIndex ? progress : index < currentIndex ? 100 : 0}%`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentStory.profile?.avatar_url} />
              </Avatar>
              <div>
                <p className="text-white font-semibold">
                  {currentStory.profile?.full_name}
                </p>
                <p className="text-white/60 text-xs">
                  {formatDistanceToNow(new Date(currentStory.created_at))} ago
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Story content */}
          <img
            src={currentStory.media_url}
            alt={currentStory.caption || ""}
            className="w-full h-full object-contain"
          />

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
            onClick={handleNext}
            disabled={currentIndex === stories.length - 1}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Caption */}
          {currentStory.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white">{currentStory.caption}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryViewer;
