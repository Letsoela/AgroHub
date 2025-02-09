import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Package,
  Truck,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const ActionButton = ({
  icon,
  label,
  onClick = () => {},
}: ActionButtonProps) => (
  <Button
    variant="outline"
    className="flex flex-col items-center justify-center h-24 w-full gap-2 p-4 hover:bg-green-50"
    onClick={onClick}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </Button>
);

interface ActionPanelProps {
  userRole?: "farmer" | "distributor" | "retailer" | "consumer";
}

const ActionPanel = ({ userRole = "farmer" }: ActionPanelProps) => {
  const actionsByRole = {
    farmer: [
      { icon: <Plus className="h-6 w-6" />, label: "Add Product" },
      { icon: <Package className="h-6 w-6" />, label: "Manage Inventory" },
      { icon: <Truck className="h-6 w-6" />, label: "Track Shipments" },
      { icon: <MessageCircle className="h-6 w-6" />, label: "Messages" },
    ],
    distributor: [
      { icon: <ShoppingCart className="h-6 w-6" />, label: "New Order" },
      { icon: <Truck className="h-6 w-6" />, label: "Manage Deliveries" },
      { icon: <Package className="h-6 w-6" />, label: "Inventory" },
      { icon: <MessageCircle className="h-6 w-6" />, label: "Messages" },
    ],
    retailer: [
      { icon: <ShoppingCart className="h-6 w-6" />, label: "Place Order" },
      { icon: <Package className="h-6 w-6" />, label: "Stock Management" },
      { icon: <Truck className="h-6 w-6" />, label: "Deliveries" },
      { icon: <MessageCircle className="h-6 w-6" />, label: "Support" },
    ],
    consumer: [
      { icon: <ShoppingCart className="h-6 w-6" />, label: "Shop Now" },
      { icon: <Truck className="h-6 w-6" />, label: "Track Order" },
      { icon: <MessageCircle className="h-6 w-6" />, label: "Contact" },
      { icon: <Plus className="h-6 w-6" />, label: "Wishlist" },
    ],
  };

  return (
    <Card className="p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actionsByRole[userRole].map((action, index) => (
          <ActionButton key={index} icon={action.icon} label={action.label} />
        ))}
      </div>
    </Card>
  );
};

export default ActionPanel;
