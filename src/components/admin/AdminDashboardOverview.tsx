
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboardOverview: React.FC = () => {
  // Fetch summary data
  const { data: orderStats, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["admin", "orderStats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*");

      if (error) throw error;
      
      // Calculate statistics
      const totalOrders = data.length;
      const totalRevenue = data.reduce((sum, order) => sum + Number(order.total), 0);
      const pendingOrders = data.filter(order => order.status === 'pending').length;
      
      return {
        totalOrders,
        totalRevenue,
        pendingOrders
      };
    }
  });

  // Fetch product data
  const { data: productStats, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["admin", "productStats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) throw error;
      
      return {
        totalProducts: data.length,
        featuredProducts: data.filter(p => p.featured).length,
        lowStockProducts: data.filter(p => p.stock < 10).length
      };
    }
  });

  // Example sales data for chart (in a real app, this would come from the database)
  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 8000 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 9500 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Order Statistics */}
        <Card className="p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Orders</h2>
          {isLoadingOrders ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-40" />
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-2">Total Orders</p>
              <p className="text-3xl font-bold">{orderStats?.totalOrders || 0}</p>
              <p className="text-amber-500 mt-2">
                {orderStats?.pendingOrders || 0} pending orders
              </p>
            </>
          )}
        </Card>
        
        {/* Revenue Statistics */}
        <Card className="p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Revenue</h2>
          {isLoadingOrders ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-40" />
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-2">Total Revenue</p>
              <p className="text-3xl font-bold">
                {formatPrice(orderStats?.totalRevenue || 0)}
              </p>
              <p className="text-green-500 mt-2">
                +12% from last month
              </p>
            </>
          )}
        </Card>
        
        {/* Product Statistics */}
        <Card className="p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Products</h2>
          {isLoadingProducts ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-40" />
            </div>
          ) : (
            <>
              <p className="text-gray-500 mb-2">Total Products</p>
              <p className="text-3xl font-bold">{productStats?.totalProducts || 0}</p>
              <p className="text-red-500 mt-2">
                {productStats?.lowStockProducts || 0} low stock products
              </p>
            </>
          )}
        </Card>
      </div>
      
      {/* Sales Chart */}
      <Card className="p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-6">Monthly Sales</h2>
        <div className="h-80">
          <ChartContainer 
            config={{ 
              sales: { 
                color: "#3b82f6" 
              } 
            }}
          >
            <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent formatter={(value) => formatPrice(value as number)} />}
              />
              <Bar dataKey="sales" name="sales" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboardOverview;
