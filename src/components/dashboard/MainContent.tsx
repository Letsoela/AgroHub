import React from "react";
import MetricsGrid from "./MetricsGrid";
import ActivityFeed from "./ActivityFeed";
import ActionPanel from "./ActionPanel";

interface MainContentProps {
  userRole?: "farmer" | "distributor" | "retailer" | "consumer";
}

const MainContent = ({ userRole = "farmer" }: MainContentProps) => {
  return (
    <div className="flex-1 p-6 bg-gray-50 space-y-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Metrics Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Dashboard Overview
          </h2>
          <MetricsGrid />
        </section>

        {/* Activity Feed and Action Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <ActivityFeed />
          </div>

          {/* Action Panel - Takes up 1 column */}
          <div className="lg:col-span-1">
            <ActionPanel userRole={userRole} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
