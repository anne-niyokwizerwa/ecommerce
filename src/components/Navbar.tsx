
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, User, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  
  // Simple admin check - in a real app, this would be more robust with roles
  const isAdmin = isAuthenticated && user?.email === "admin@example.com";

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-brand-blue">TechEdge</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-brand-teal transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-brand-teal transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-teal transition-colors">
              About
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-brand-blue hover:text-brand-teal font-medium transition-colors">
                Admin
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="text-gray-700 hover:text-brand-teal transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-teal text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Hi, {user?.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-700 hover:text-brand-teal"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-brand-teal transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-brand-teal transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-brand-teal transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-brand-blue hover:text-brand-teal font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
              )}
              <Link
                to="/cart"
                className="text-gray-700 hover:text-brand-teal transition-colors flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Cart ({totalItems})
              </Link>

              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-700">Hi, {user?.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-gray-700 hover:text-brand-teal justify-start px-0"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" size="sm" asChild className="justify-start px-0">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      Register
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
