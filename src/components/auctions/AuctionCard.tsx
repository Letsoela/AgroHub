import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Timer, Gavel } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AuctionCardProps {
  auction: {
    id: string;
    title: string;
    description: string;
    currentBid: number;
    endTime: string;
    imageUrl: string;
    totalBids: number;
    status: "upcoming" | "active" | "ended";
  };
}

const AuctionCard = ({ auction }: AuctionCardProps) => {
  const timeLeft = formatDistanceToNow(new Date(auction.endTime), {
    addSuffix: true,
  });

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-square relative">
        <img
          src={auction.imageUrl}
          alt={auction.title}
          className="w-full h-full object-cover"
        />
        <Badge
          className="absolute top-2 right-2"
          variant={auction.status === "active" ? "default" : "secondary"}
        >
          {auction.status === "active" ? "Live" : auction.status}
        </Badge>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{auction.title}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {auction.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Bid</span>
            <span className="font-semibold text-lg">
              ${auction.currentBid.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Gavel className="w-4 h-4" />
              <span>{auction.totalBids} bids</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Timer className="w-4 h-4" />
              <span>{timeLeft}</span>
            </div>
          </div>
        </div>

        <Button className="w-full" disabled={auction.status !== "active"}>
          Place Bid
        </Button>
      </div>
    </Card>
  );
};

export default AuctionCard;
