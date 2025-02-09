import React, { useState } from "react";
import { signInWithEmail, signUpWithEmail } from "@/lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "./AuthForm";
import { UserRole } from "@/lib/types";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();
  const [mode, setMode] = useState<"login" | "register">("login");

  const handleAuth = async (data: {
    email: string;
    password: string;
    name?: string;
    role?: UserRole;
  }) => {
    try {
      if (mode === "login") {
        const { data: authData, error } = await signInWithEmail(
          data.email,
          data.password,
        );
        if (error) throw error;

        const user = authData.user;
        if (!user) throw new Error("No user returned");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");
        const role = user.user_metadata?.role || "consumer";
        navigate(`/${role}`);
      } else {
        const metadata = {
          name: data.name,
          role: data.role || "consumer",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
        };

        const { data: authData, error } = await signUpWithEmail(
          data.email,
          data.password,
          metadata,
        );
        if (error) throw error;

        setError("Please check your email to verify your account.");
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    handleAuth({
      email: `${role}@example.com`,
      password: "password123",
      role: role,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Tabs
          defaultValue={mode}
          className="w-full"
          onValueChange={(v) => setMode(v as "login" | "register")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-6">
            <AuthForm mode="login" onSubmit={handleAuth} error={error} />
          </TabsContent>

          <TabsContent value="register" className="space-y-6">
            <AuthForm mode="register" onSubmit={handleAuth} error={error} />
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-b from-green-50 to-green-100 text-gray-500">
              Quick Login As
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => handleQuickLogin("farmer")}>
            Farmer
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickLogin("distributor")}
          >
            Distributor
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickLogin("retailer")}
          >
            Retailer
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickLogin("consumer")}
          >
            Consumer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
