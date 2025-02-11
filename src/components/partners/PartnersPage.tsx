import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Star } from "lucide-react";

const mockPartners = [
  {
    id: "1",
    name: "Fresh Farms",
    type: "Farmer",
    location: "Cape Town",
    rating: 4.8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=farm1",
    status: "active",
    products: ["Tomatoes", "Lettuce", "Carrots"],
  },
  {
    id: "2",
    name: "Global Distribution",
    type: "Distributor",
    location: "Johannesburg",
    rating: 4.5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dist1",
    status: "active",
    products: ["Fruits", "Vegetables", "Grains"],
  },
];

const PartnersPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Partners</h1>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search partners..." className="pl-9" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPartners.map((partner) => (
            <Card key={partner.id} className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={partner.avatar} />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{partner.name}</h3>
                    <Badge variant="secondary">{partner.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {partner.location}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{partner.rating}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">Products:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {partner.products.map((product) => (
                    <Badge key={product} variant="outline">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button className="flex-1" variant="outline" size="sm">
                  View Profile
                </Button>
                <Button className="flex-1" size="sm">
                  Contact
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PartnersPage;
