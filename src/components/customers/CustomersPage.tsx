import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Star } from "lucide-react";

const mockCustomers = [
  {
    id: "1",
    name: "Fresh Market",
    type: "Retailer",
    location: "Cape Town",
    totalOrders: 156,
    totalSpent: 12500,
    lastOrder: "2024-04-19",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer1",
    status: "active",
  },
  {
    id: "2",
    name: "Green Grocers",
    type: "Retailer",
    location: "Johannesburg",
    totalOrders: 89,
    totalSpent: 8900,
    lastOrder: "2024-04-18",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer2",
    status: "active",
  },
];

const CustomersPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-9" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCustomers.map((customer) => (
            <Card key={customer.id} className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={customer.avatar} />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{customer.name}</h3>
                    <Badge variant="secondary">{customer.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {customer.location}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="font-semibold">{customer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="font-semibold">${customer.totalSpent}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Last Order</p>
                <p className="font-semibold">{customer.lastOrder}</p>
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

export default CustomersPage;
