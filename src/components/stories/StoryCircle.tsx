import React from "react";
import { Avatar } from "@/components/ui/avatar";

interface StoryCircleProps {
  name: string;
  avatar: string;
  thumbnail: string;
  isViewed: boolean;
}

const StoryCircle = ({
  name,
  avatar,
  thumbnail,
  isViewed,
}: StoryCircleProps) => {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer">
      <div
        className={`rounded-full p-[2px] ${
          isViewed
            ? "bg-gray-200"
            : "bg-gradient-to-tr from-yellow-400 to-fuchsia-600"
        }`}
      >
        <div className="rounded-full p-[2px] bg-white">
          <Avatar className="h-14 w-14 hover:scale-105 transition-transform">
            <img src={thumbnail} alt={name} className="object-cover" />
          </Avatar>
        </div>
      </div>
      <span className="text-xs text-gray-600 truncate w-16 text-center">
        {name}
      </span>
    </div>
  );
};

export default StoryCircle;
