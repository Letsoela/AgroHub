import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import StoryCircle from "./StoryCircle";

const defaultStories = [
  {
    id: "1",
    user: {
      name: "Farm Fresh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FarmFresh",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1595856619767-ab951ca3b8c7?w=200",
    isViewed: false,
  },
  {
    id: "2",
    user: {
      name: "Green Acres",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GreenAcres",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=200",
    isViewed: true,
  },
  {
    id: "3",
    user: {
      name: "Tech Farm",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechFarm",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200",
    isViewed: false,
  },
];

const StoriesBar = () => {
  return (
    <div className="bg-white rounded-lg p-4">
      <ScrollArea className="w-full">
        <div className="flex gap-4">
          {defaultStories.map((story) => (
            <StoryCircle
              key={story.id}
              name={story.user.name}
              avatar={story.user.avatar}
              thumbnail={story.thumbnail}
              isViewed={story.isViewed}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StoriesBar;
