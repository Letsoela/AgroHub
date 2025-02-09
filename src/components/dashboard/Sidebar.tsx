import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Package,
  Truck,
  Users,
  ShoppingCart,
  MessageCircle,
  Settings,
  LogOut,
  BarChart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  userRole?: "farmer" | "distributor" | "retailer" | "consumer";
  activeItem?: string;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar = ({
  userRole = "farmer",
  activeItem = "dashboard",
}: SidebarProps) => {
  const navigate = useNavigate();

  const navItemsByRole: Record<string, NavItem[]> = {
    farmer: [
      {
        label: "Dashboard",
        icon: <Home className="w-5 h-5" />,
        href: "/dashboard",
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
        label: "Dashboard",
        icon: <Home className="w-5 h-5" />,
        href: "/dashboard",
      },
      {
        label: "Products",
        icon: <Package className="w-5 h-5" />,
        href: "/products",
      },
      {
        label: "Distribution",
        icon: <Truck className="w-5 h-5" />,
        href: "/distribution",
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
        label: "Dashboard",
        icon: <Home className="w-5 h-5" />,
        href: "/dashboard",
      },
      {
        label: "Products",
        icon: <Package className="w-5 h-5" />,
        href: "/products",
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
        label: "Dashboard",
        icon: <Home className="w-5 h-5" />,
        href: "/dashboard",
      },
      {
        label: "Shop",
        icon: <ShoppingCart className="w-5 h-5" />,
        href: "/shop",
      },
      {
        label: "Orders",
        icon: <Package className="w-5 h-5" />,
        href: "/orders",
      },
      { label: "Track", icon: <Truck className="w-5 h-5" />, href: "/track" },
    ],
  };

  const commonItems = [
    {
      label: "Messages",
      icon: <MessageCircle className="w-5 h-5" />,
      href: "/messages",
    },
    {
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      href: "/settings",
    },
  ];

  const navItems = [...(navItemsByRole[userRole] || []), ...commonItems];

  return (
    <div className="w-[280px] h-full bg-white border-r px-3 py-4 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="text-2xl font-bold text-primary">AgroHub</h2>
          <p className="text-sm text-muted-foreground capitalize">
            {userRole} Portal
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={
                activeItem === item.label.toLowerCase() ? "secondary" : "ghost"
              }
              className={cn(
                "w-full justify-start gap-3 px-3 py-2 h-10",
                activeItem === item.label.toLowerCase()
                  ? "bg-secondary"
                  : "hover:bg-secondary/50",
              )}
              onClick={() => navigate(item.href)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>

      <Button
        variant="ghost"
        className="w-full justify-start gap-3 px-3 py-2 h-10 text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={() => navigate("/logout")}
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default Sidebar;
