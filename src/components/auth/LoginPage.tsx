import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/AuthContext";
import { UserRole } from "@/lib/types";

const LoginPage = () => {
  const location = useLocation();
  const { user } = useAuth();

  // If already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleQuickLogin = async (role: UserRole) => {
    try {
      // Quick login with predefined credentials
      await signIn(`${role}@example.com`, "password123", {
        name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`,
      });
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to AgroHub
          </h1>
          <p className="text-gray-600">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2"
            onClick={() => handleQuickLogin("farmer")}
          >
            Farmer
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2"
            onClick={() => handleQuickLogin("distributor")}
          >
            Distributor
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2"
            onClick={() => handleQuickLogin("retailer")}
          >
            Retailer
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col gap-2"
            onClick={() => handleQuickLogin("consumer")}
          >
            Consumer
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
