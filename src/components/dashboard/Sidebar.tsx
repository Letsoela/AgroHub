import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserRole } from "@/lib/types";
import {
  Home,
  MessageSquare,
  Store,
  Package,
  Truck,
  Users,
  Settings,
  BarChart,
  ShoppingCart,
  Map,
  Tag,
  Network,
  Gavel,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

// Role specific items
const roleSpecificItems: Record<UserRole, NavItem[]> = {
  farmer: [
    {
      label: "Inventory",
      icon: <Package className="w-5 h-5" />,
      href: "/inventory",
    },
    {
      label: "Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/orders",
    },
    {
      label: "Shipments",
      icon: <Truck className="w-5 h-5" />,
      href: "/shipments",
    },
    {
      label: "Analytics",
      icon: <BarChart className="w-5 h-5" />,
      href: "/analytics",
    },
  ],
  distributor: [
    {
      label: "Supply Chain",
      icon: <Network className="w-5 h-5" />,
      href: "/supply-chain",
    },
    {
      label: "Inventory",
      icon: <Package className="w-5 h-5" />,
      href: "/inventory",
    },
    {
      label: "Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/orders",
    },
    {
      label: "Partners",
      icon: <Users className="w-5 h-5" />,
      href: "/partners",
    },
    {
      label: "Analytics",
      icon: <BarChart className="w-5 h-5" />,
      href: "/analytics",
    },
  ],
  retailer: [
    {
      label: "Marketplace",
      icon: <Store className="w-5 h-5" />,
      href: "/marketplace",
    },
    {
      label: "Store",
      icon: <Store className="w-5 h-5" />,
      href: "/store",
    },
    {
      label: "Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/orders",
    },
    {
      label: "Customers",
      icon: <Users className="w-5 h-5" />,
      href: "/customers",
    },
    {
      label: "Analytics",
      icon: <BarChart className="w-5 h-5" />,
      href: "/analytics",
    },
  ],
  consumer: [
    {
      label: "Marketplace",
      icon: <Store className="w-5 h-5" />,
      href: "/marketplace",
    },
    {
      label: "Find Stores",
      icon: <Map className="w-5 h-5" />,
      href: "/stores",
    },
    {
      label: "My Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
      href: "/orders",
    },
    {
      label: "Track Order",
      icon: <Truck className="w-5 h-5" />,
      href: "/track",
    },
    {
      label: "Deals",
      icon: <Tag className="w-5 h-5" />,
      href: "/deals",
    },
  ],
};

// Common items for all roles
const commonItems: NavItem[] = [
  {
    label: "Feed",
    icon: <Home className="w-5 h-5" />,
    href: "/feed",
  },
  {
    label: "Messages",
    icon: <MessageSquare className="w-5 h-5" />,
    href: "/messages",
  },
  {
    label: "Auctions",
    icon: <Gavel className="w-5 h-5" />,
    href: "/auctions",
  },
];

interface SidebarProps {
  userRole?: UserRole;
}

const Sidebar = ({ userRole = "consumer" }: SidebarProps) => {
  const location = useLocation();
  const items = [...commonItems, ...roleSpecificItems[userRole]];

  return (
    <div className="w-[280px] h-full border-r bg-white">
      <ScrollArea className="h-full py-6">
        <nav className="space-y-2 px-4">
          {items.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start",
                location.pathname === item.href && "bg-muted",
              )}
            >
              <Link to={item.href} className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
