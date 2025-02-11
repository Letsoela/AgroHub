import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/lib/types";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleQuickRegister = (role: UserRole) => {
    // Just navigate to feed since we're bypassing auth
    navigate("/feed");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => handleQuickRegister("farmer")}
          >
            Farmer
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickRegister("distributor")}
          >
            Distributor
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickRegister("retailer")}
          >
            Retailer
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickRegister("consumer")}
          >
            Consumer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
