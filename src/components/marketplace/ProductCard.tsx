import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart, MapPin, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string;
    price_per_unit: number;
    unit: string;
    quantity: number;
    category: string;
    location?: string;
    available_from: string;
    available_until?: string;
    created_at: string;
    seller?: {
      full_name: string;
      avatar_url: string;
      business_type: string;
    };
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-square relative">
        <img
          src={`https://source.unsplash.com/400x400/?${product.category},${product.name}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <Badge
          className="absolute top-2 right-2"
          variant={product.quantity > 0 ? "default" : "destructive"}
        >
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {product.description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">
              ${product.price_per_unit}/{product.unit}
            </span>
            <Badge variant="secondary">{product.category}</Badge>
          </div>

          {product.location && (
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{product.location}</span>
            </div>
          )}

          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              Available {formatDistanceToNow(new Date(product.available_from))}{" "}
              ago
            </span>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">
              <ShoppingCart className="w-4 h-4 mr-2" /> Order Now
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order {product.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {product.seller && (
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={product.seller.avatar_url} />
                  </Avatar>
                  <div>
                    <p className="font-semibold">{product.seller.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.seller.business_type}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">
                    Price per {product.unit}
                  </p>
                  <p className="text-2xl font-bold">
                    ${product.price_per_unit.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Available Quantity</p>
                  <p className="text-2xl font-bold">
                    {product.quantity} {product.unit}
                  </p>
                </div>
              </div>

              {/* Order form will be added here */}
              <p className="text-center text-muted-foreground">
                Order form coming soon
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default ProductCard;
