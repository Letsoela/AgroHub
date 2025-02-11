import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Story } from "@/lib/types/social";

interface StoryCardProps {
  story: Story;
  onClick?: () => void;
}

const StoryCard = ({ story, onClick }: StoryCardProps) => {
  return (
    <button
      className="w-20 h-32 relative rounded-lg overflow-hidden flex-shrink-0 group cursor-pointer"
      onClick={onClick}
    >
      <img
        src={story.media_url}
        alt={story.caption || ""}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />

      <div className="absolute top-2 left-1/2 -translate-x-1/2">
        <Avatar className="w-8 h-8 border-2 border-primary">
          <AvatarImage src={story.profile?.avatar_url} />
        </Avatar>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full px-1">
        <p className="text-white text-xs text-center truncate">
          {story.profile?.full_name}
        </p>
      </div>
    </button>
  );
};

export default StoryCard;
