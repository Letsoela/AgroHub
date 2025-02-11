import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Truck } from "lucide-react";

const mockShipments = [
  {
    id: "1",
    tracking: "SHP001",
    order: "#1234",
    destination: "Cape Town CBD",
    date: "2024-04-20",
    status: "in_transit",
    eta: "2024-04-21",
  },
  {
    id: "2",
    tracking: "SHP002",
    order: "#1235",
    destination: "Johannesburg",
    date: "2024-04-19",
    status: "delivered",
    eta: "2024-04-20",
  },
];

const ShipmentsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <Button>
          <Truck className="w-4 h-4 mr-2" />
          Create Shipment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-blue-50">
          <h3 className="font-semibold text-blue-700">Active Shipments</h3>
          <p className="text-2xl font-bold">12</p>
        </Card>
        <Card className="p-4 bg-green-50">
          <h3 className="font-semibold text-green-700">Delivered Today</h3>
          <p className="text-2xl font-bold">5</p>
        </Card>
        <Card className="p-4 bg-yellow-50">
          <h3 className="font-semibold text-yellow-700">Pending</h3>
          <p className="text-2xl font-bold">3</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by tracking number or order ID..."
              className="pl-9"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking #</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Ship Date</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockShipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-medium">
                  {shipment.tracking}
                </TableCell>
                <TableCell>{shipment.order}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {shipment.destination}
                  </div>
                </TableCell>
                <TableCell>{shipment.date}</TableCell>
                <TableCell>{shipment.eta}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      shipment.status === "delivered" ? "default" : "secondary"
                    }
                  >
                    {shipment.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Track
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ShipmentsPage;
