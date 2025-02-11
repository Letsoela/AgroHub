import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Star, Clock } from "lucide-react";

const mockStores = [
  {
    id: "1",
    name: "Fresh Market",
    type: "Farmer Market",
    location: "Cape Town CBD",
    rating: 4.8,
    reviews: 156,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=store1",
    distance: "2.5 km",
    hours: "08:00 - 18:00",
    products: ["Vegetables", "Fruits", "Organic"],
  },
  {
    id: "2",
    name: "Green Grocers",
    type: "Retail Store",
    location: "Woodstock",
    rating: 4.5,
    reviews: 89,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=store2",
    distance: "3.8 km",
    hours: "09:00 - 20:00",
    products: ["Local Produce", "Dairy", "Bakery"],
  },
];

const FindStoresPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Find Stores</h1>
        <Button variant="outline">
          <MapPin className="w-4 h-4 mr-2" />
          View Map
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stores by name or location..."
            className="pl-9"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockStores.map((store) => (
            <Card key={store.id} className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={store.avatar} />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{store.name}</h3>
                    <Badge variant="secondary">{store.type}</Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">
                      {store.rating} ({store.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {store.location} • {store.distance}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{store.hours}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">Available Products:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {store.products.map((product) => (
                    <Badge key={product} variant="outline">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button className="flex-1" variant="outline" size="sm">
                  View Details
                </Button>
                <Button className="flex-1" size="sm">
                  Visit Store
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FindStoresPage;
