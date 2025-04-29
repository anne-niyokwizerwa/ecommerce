
import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes: any email with a password longer than 6 chars works
    if (password.length >= 6) {
      const mockUser: User = {
        id: "user-1",
        email,
        name: email.split('@')[0]
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        duration: 3000
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    }
    setLoading(false);
  };

  // Mock register function
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password.length >= 6) {
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast({
        title: "Registration Successful",
        description: "Your account has been created.",
        duration: 3000
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
        duration: 3000
      });
    }
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      duration: 3000
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        loading, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
