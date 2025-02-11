import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Store,
  Package,
  DollarSign,
  Users,
  Settings,
  Search,
} from "lucide-react";

const StorePage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Store Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Package className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <Store className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">124</p>
        </Card>

        <Card className="p-4">
          <DollarSign className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold">$12,345</p>
        </Card>

        <Card className="p-4">
          <Users className="w-8 h-8 text-purple-500 mb-2" />
          <h3 className="font-semibold">Customers</h3>
          <p className="text-2xl font-bold">1,234</p>
        </Card>

        <Card className="p-4">
          <Package className="w-8 h-8 text-yellow-500 mb-2" />
          <h3 className="font-semibold">Orders</h3>
          <p className="text-2xl font-bold">56</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-9 w-[300px]"
              />
            </div>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>#12345</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>Organic Tomatoes, Fresh Lettuce</TableCell>
              <TableCell>$123.45</TableCell>
              <TableCell>
                <Badge>Processing</Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default StorePage;
