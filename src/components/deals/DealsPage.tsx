import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, Tag } from "lucide-react";

const mockDeals = [
  {
    id: "1",
    title: "Bulk Order Discount",
    description: "Get 15% off on orders above 1000kg of fresh produce",
    discount: "15%",
    minOrder: "1000kg",
    validUntil: "2024-05-01",
    category: "Bulk Order",
    status: "active",
  },
  {
    id: "2",
    title: "Early Bird Special",
    description: "Pre-order your seasonal vegetables and get 10% off",
    discount: "10%",
    minOrder: "500kg",
    validUntil: "2024-04-30",
    category: "Pre-Order",
    status: "active",
  },
];

const DealsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Special Deals</h1>
        <Button>
          <Tag className="w-4 h-4 mr-2" />
          Create Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDeals.map((deal) => (
          <Card key={deal.id} className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{deal.title}</h3>
                <Badge variant="secondary" className="mt-1">
                  {deal.category}
                </Badge>
              </div>
              <Badge
                variant={deal.status === "active" ? "default" : "secondary"}
              >
                {deal.status}
              </Badge>
            </div>

            <p className="text-muted-foreground">{deal.description}</p>

            <div className="pt-4 space-y-2 border-t">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-sm">Discount: {deal.discount}</span>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Min. Order: {deal.minOrder}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Valid until: {deal.validUntil}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1" variant="outline">
                Edit
              </Button>
              <Button className="flex-1">Apply</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
