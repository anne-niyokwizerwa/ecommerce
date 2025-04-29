
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductManagement from "@/components/admin/ProductManagement";

const AdminProductsPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  // Simple admin check - in a real app, this would be more robust with roles
  const isAdmin = isAuthenticated && user?.email === "admin@example.com";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <AdminLayout>
      <ProductManagement />
    </AdminLayout>
  );
};

export default AdminProductsPage;
