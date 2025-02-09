import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Package, Truck, DollarSign } from "lucide-react";

interface Activity {
  id: string;
  type: "order" | "delivery" | "payment" | "notification";
  title: string;
  description: string;
  timestamp: string;
  status?: "pending" | "completed" | "failed";
}

interface ActivityFeedProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    description: "Order #12345 for 500kg of organic tomatoes",
    timestamp: "2 minutes ago",
    status: "pending",
  },
  {
    id: "2",
    type: "delivery",
    title: "Delivery Completed",
    description: "Order #12342 delivered to Fresh Market",
    timestamp: "1 hour ago",
    status: "completed",
  },
  {
    id: "3",
    type: "payment",
    title: "Payment Received",
    description: "Payment of R15,000 received for Order #12340",
    timestamp: "3 hours ago",
    status: "completed",
  },
  {
    id: "4",
    type: "notification",
    title: "Stock Alert",
    description: "Low stock warning for carrots",
    timestamp: "5 hours ago",
    status: "failed",
  },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "order":
      return <Package className="h-4 w-4" />;
    case "delivery":
      return <Truck className="h-4 w-4" />;
    case "payment":
      return <DollarSign className="h-4 w-4" />;
    case "notification":
      return <Bell className="h-4 w-4" />;
  }
};

const getStatusColor = (status: Activity["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "completed":
      return "bg-green-500";
    case "failed":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const ActivityFeed = ({
  activities = defaultActivities,
}: ActivityFeedProps) => {
  return (
    <Card className="w-full h-[400px] bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Activity Feed</h2>
        <Badge variant="secondary">{activities.length} Activities</Badge>
      </div>

      <ScrollArea className="h-[300px] w-full pr-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Avatar className={`${getStatusColor(activity.status)} p-2`}>
                {getActivityIcon(activity.type)}
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <span className="text-sm text-gray-500">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
                {activity.status && (
                  <Badge
                    variant="outline"
                    className={`${
                      activity.status === "completed"
                        ? "text-green-600"
                        : activity.status === "failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {activity.status.charAt(0).toUpperCase() +
                      activity.status.slice(1)}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ActivityFeed;
