import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getStories } from "@/lib/api";
import { Story } from "@/lib/types/social";
import StoryCard from "./StoryCard";
import CreateStoryDialog from "./CreateStoryDialog";

const StoriesSection = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [showCreateStory, setShowCreateStory] = useState(false);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const data = await getStories();
      setStories(data);
    } catch (error) {
      console.error("Error loading stories:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <ScrollArea className="w-full">
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="w-20 h-32 flex-shrink-0 flex flex-col items-center justify-center gap-2"
            onClick={() => setShowCreateStory(true)}
          >
            <Plus className="h-6 w-6" />
            <span className="text-xs">Create Story</span>
          </Button>

          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </ScrollArea>

      <CreateStoryDialog
        open={showCreateStory}
        onOpenChange={setShowCreateStory}
        onSuccess={loadStories}
      />
    </div>
  );
};

export default StoriesSection;
