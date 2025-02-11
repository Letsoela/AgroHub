import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, Package, Users, AlertTriangle, Activity } from "lucide-react";

const SupplyChainPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Supply Chain Overview</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Package className="w-4 h-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <Truck className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="font-semibold">Active Shipments</h3>
          <p className="text-2xl font-bold">24</p>
        </Card>

        <Card className="p-4">
          <Package className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="font-semibold">Inventory Items</h3>
          <p className="text-2xl font-bold">1,234</p>
        </Card>

        <Card className="p-4">
          <Users className="w-8 h-8 text-purple-500 mb-2" />
          <h3 className="font-semibold">Active Partners</h3>
          <p className="text-2xl font-bold">45</p>
        </Card>

        <Card className="p-4">
          <AlertTriangle className="w-8 h-8 text-yellow-500 mb-2" />
          <h3 className="font-semibold">Issues</h3>
          <p className="text-2xl font-bold">3</p>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Supply Chain Map</h2>
            <div className="h-[400px] flex items-center justify-center border rounded bg-gray-50">
              Interactive supply chain map will be implemented here
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="shipments">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Active Shipments</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Truck className="w-6 h-6 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">Shipment #{i}</h3>
                        <p className="text-sm text-muted-foreground">
                          Cape Town to Johannesburg
                        </p>
                      </div>
                    </div>
                    <Badge>In Transit</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Inventory Status</h2>
            <div className="h-[400px] flex items-center justify-center border rounded bg-gray-50">
              Inventory management interface will be implemented here
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="partners">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Partner Network</h2>
            <div className="h-[400px] flex items-center justify-center border rounded bg-gray-50">
              Partner management interface will be implemented here
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplyChainPage;
