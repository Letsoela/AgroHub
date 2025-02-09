import React from "react";
import { Card } from "../ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Package,
  Truck,
  Users,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  change = 0,
  icon,
}: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-6 bg-white">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <div className="flex items-center space-x-2">
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {Math.abs(change)}%
            </span>
          </div>
        </div>
        <div className="p-3 bg-primary/10 rounded-full">{icon}</div>
      </div>
    </Card>
  );
};

interface MetricsGridProps {
  metrics?: {
    title: string;
    value: string;
    change: number;
    icon: React.ReactNode;
  }[];
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  const defaultMetrics = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: 12.5,
      icon: <DollarSign className="w-6 h-6 text-primary" />,
    },
    {
      title: "Total Orders",
      value: "156",
      change: -2.3,
      icon: <Package className="w-6 h-6 text-primary" />,
    },
    {
      title: "Active Deliveries",
      value: "23",
      change: 8.1,
      icon: <Truck className="w-6 h-6 text-primary" />,
    },
    {
      title: "New Customers",
      value: "45",
      change: 5.6,
      icon: <Users className="w-6 h-6 text-primary" />,
    },
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className="w-full bg-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;
