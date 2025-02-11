import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, Truck, MapPin, Calendar } from "lucide-react";

const mockOrder = {
  id: "ORD-12345",
  status: "in_transit",
  estimatedDelivery: "2024-04-22",
  origin: "Fresh Farms, Cape Town",
  destination: "Green Market, Johannesburg",
  items: [
    {
      name: "Organic Tomatoes",
      quantity: "500 kg",
      price: "$750.00",
    },
    {
      name: "Fresh Lettuce",
      quantity: "200 kg",
      price: "$300.00",
    },
  ],
  timeline: [
    {
      status: "Order Placed",
      date: "2024-04-19 09:00 AM",
      completed: true,
    },
    {
      status: "Order Confirmed",
      date: "2024-04-19 10:30 AM",
      completed: true,
    },
    {
      status: "Picked Up",
      date: "2024-04-20 08:15 AM",
      completed: true,
    },
    {
      status: "In Transit",
      date: "2024-04-20 09:30 AM",
      completed: true,
    },
    {
      status: "Out for Delivery",
      date: null,
      completed: false,
    },
    {
      status: "Delivered",
      date: null,
      completed: false,
    },
  ],
};

const TrackOrderPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Track Order</h1>
        <Button variant="outline">
          <Package className="w-4 h-4 mr-2" />
          View All Orders
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Enter order number to track..."
            className="pl-9"
            defaultValue={mockOrder.id}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <Card className="p-4 lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-semibold">Order {mockOrder.id}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Estimated Delivery: {mockOrder.estimatedDelivery}
                  </span>
                </div>
              </div>
              <Badge
                variant={
                  mockOrder.status === "delivered" ? "default" : "secondary"
                }
              >
                {mockOrder.status.replace("_", " ")}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium">{mockOrder.origin}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-medium">{mockOrder.destination}</p>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="space-y-2">
                  {mockOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Tracking Timeline</h3>
            <div className="relative">
              {mockOrder.timeline.map((event, index) => (
                <div key={index} className="flex gap-3 mb-4">
                  <div className="relative">
                    <div
                      className={`w-4 h-4 rounded-full ${event.completed ? "bg-green-500" : "bg-gray-200"}`}
                    />
                    {index < mockOrder.timeline.length - 1 && (
                      <div
                        className={`absolute top-4 left-2 w-0.5 h-full -ml-[2px] ${event.completed ? "bg-green-500" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{event.status}</p>
                    {event.date && (
                      <p className="text-sm text-muted-foreground">
                        {event.date}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default TrackOrderPage;
