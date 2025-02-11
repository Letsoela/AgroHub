import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getStories } from "@/lib/api";
import { Story } from "@/lib/types/social";
import StoryCard from "./StoryCard";
import CreateStoryDialog from "./CreateStoryDialog";
import StoryViewer from "./StoryViewer";

const StoriesBar = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(-1);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const data = await getStories();
      setStories(data);
    } catch (error) {
      console.error("Error loading stories:", error);
      // Fallback to mock data
      import("@/lib/mockData").then(({ mockStories }) => {
        setStories(mockStories);
      });
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

          {stories.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              onClick={() => setSelectedStoryIndex(index)}
            />
          ))}
        </div>
      </ScrollArea>

      <CreateStoryDialog
        open={showCreateStory}
        onOpenChange={setShowCreateStory}
        onSuccess={loadStories}
      />

      {selectedStoryIndex >= 0 && (
        <StoryViewer
          stories={stories}
          initialStoryIndex={selectedStoryIndex}
          open={selectedStoryIndex >= 0}
          onOpenChange={(open) => !open && setSelectedStoryIndex(-1)}
        />
      )}
    </div>
  );
};

export default StoriesBar;
