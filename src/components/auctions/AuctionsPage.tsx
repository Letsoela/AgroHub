import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Timer, Gavel } from "lucide-react";
import CreateAuctionDialog from "./CreateAuctionDialog";
import AuctionCard from "./AuctionCard";
import { useAuth } from "@/lib/AuthContext";

const AuctionsPage = () => {
  const { user } = useAuth();
  const [showCreateAuction, setShowCreateAuction] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Livestock Auctions</h1>
        <Button
          onClick={() => setShowCreateAuction(true)}
          disabled={!user || user.role === "consumer"}
          title={
            user?.role === "consumer"
              ? "Only sellers can create auctions"
              : "Create new auction"
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Create Auction
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search auctions..." className="pl-9" />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">
              <Timer className="w-4 h-4 mr-2" /> Live Auctions
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              <Gavel className="w-4 h-4 mr-2" /> Upcoming
            </TabsTrigger>
            <TabsTrigger value="ended">Past Auctions</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AuctionCard
                auction={{
                  id: "1",
                  title: "Premium Black Bull",
                  description:
                    "2-year-old purebred Black Bull, excellent genetics and conformation",
                  currentBid: 15000,
                  endTime: new Date(Date.now() + 3600000).toISOString(),
                  imageUrl:
                    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
                  totalBids: 12,
                  status: "active",
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Upcoming auctions */}
            </div>
          </TabsContent>

          <TabsContent value="ended" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Past auctions */}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <CreateAuctionDialog
        open={showCreateAuction}
        onOpenChange={setShowCreateAuction}
      />
    </div>
  );
};

export default AuctionsPage;
