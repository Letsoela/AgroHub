import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
} from "lucide-react";

const AnalyticsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold">$12,345</h3>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm">12.5%</span>
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <h3 className="text-2xl font-bold">156</h3>
              <div className="flex items-center gap-1 text-red-600">
                <ArrowDownRight className="w-4 h-4" />
                <span className="text-sm">2.3%</span>
              </div>
            </div>
            <ShoppingCart className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">New Customers</p>
              <h3 className="text-2xl font-bold">45</h3>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm">5.6%</span>
              </div>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Growth Rate</p>
              <h3 className="text-2xl font-bold">8.5%</h3>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm">1.2%</span>
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
            <div className="h-[300px] flex items-center justify-center border rounded">
              Chart will be implemented here
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Sales Analysis</h2>
            <div className="h-[300px] flex items-center justify-center border rounded">
              Sales chart will be implemented here
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Inventory Status</h2>
            <div className="h-[300px] flex items-center justify-center border rounded">
              Inventory chart will be implemented here
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">
              Customer Demographics
            </h2>
            <div className="h-[300px] flex items-center justify-center border rounded">
              Customer chart will be implemented here
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
