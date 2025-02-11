import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import StoriesBar from "../stories/StoriesBar";
import SmartWidgets from "../shared/SmartWidgets";
import CreatePost from "../posts/CreatePost";
import PostsList from "../posts/PostsList";

const FeedPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Feed Column */}
        <div className="lg:col-span-8 space-y-6">
          <StoriesBar />
          <CreatePost onPostCreated={handlePostCreated} />
          <PostsList refreshTrigger={refreshTrigger} />
        </div>

        {/* Widgets Column */}
        <div className="lg:col-span-4 space-y-6">
          <SmartWidgets />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
