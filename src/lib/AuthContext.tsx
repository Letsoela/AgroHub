import React, { createContext, useContext, useState } from "react";
import { UserRole } from "./types";

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string, metadata: any) => Promise<void>;
  signOut: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signIn = async (email: string, password: string, metadata: any) => {
    // For quick login, we'll just set the user directly
    const userData = {
      id: "1",
      email,
      name: metadata.name,
      role: metadata.role,
      avatar: metadata.avatar,
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
