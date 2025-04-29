
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut 
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/admin" className="text-2xl font-bold text-brand-blue">
            TechEdge Admin
          </Link>
          <Button variant="ghost" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200">
          <nav className="p-4 space-y-2">
            <Link
              to="/admin"
              className={`flex items-center p-3 rounded-md ${
                isActive("/admin")
                  ? "bg-brand-blue text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className={`flex items-center p-3 rounded-md ${
                isActive("/admin/products")
                  ? "bg-brand-blue text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <Package className="mr-2 h-5 w-5" />
              Products
            </Link>
            <Link
              to="/admin/orders"
              className={`flex items-center p-3 rounded-md ${
                isActive("/admin/orders")
                  ? "bg-brand-blue text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Orders
            </Link>
            <Link
              to="/admin/settings"
              className={`flex items-center p-3 rounded-md ${
                isActive("/admin/settings")
                  ? "bg-brand-blue text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
