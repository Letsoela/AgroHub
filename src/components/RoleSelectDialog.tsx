import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/types";

interface RoleSelectDialogProps {
  open: boolean;
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelectDialog = ({ open, onRoleSelect }: RoleSelectDialogProps) => {
  const roles: { role: UserRole; label: string }[] = [
    { role: "farmer", label: "Farmer" },
    { role: "distributor", label: "Distributor" },
    { role: "retailer", label: "Retailer" },
    { role: "consumer", label: "Consumer" },
  ];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Your Role</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {roles.map(({ role, label }) => (
            <Button
              key={role}
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => onRoleSelect(role)}
            >
              {label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectDialog;
