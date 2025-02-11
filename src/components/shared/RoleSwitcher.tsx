import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/types";
import { useAuth } from "@/lib/AuthContext";

const roles: { role: UserRole; label: string }[] = [
  { role: "farmer", label: "Farmer" },
  { role: "distributor", label: "Distributor" },
  { role: "retailer", label: "Retailer" },
  { role: "consumer", label: "Consumer" },
];

const RoleSwitcher = () => {
  const { user, signIn } = useAuth();

  const handleRoleChange = async (role: UserRole) => {
    await signIn(`${role}@example.com`, "password123", {
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      role: role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          View as: {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {roles.map(({ role, label }) => (
          <DropdownMenuItem
            key={role}
            onClick={() => handleRoleChange(role)}
            className="capitalize"
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
