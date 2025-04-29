
import type { Database } from '@/integrations/supabase/types';

export type ProductFromSupabase = Database['public']['Tables']['products']['Row'];
export type OrderFromSupabase = Database['public']['Tables']['orders']['Row'];
export type OrderItemFromSupabase = Database['public']['Tables']['order_items']['Row'];
export type ProfileFromSupabase = Database['public']['Tables']['profiles']['Row'];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  stock: number; // Added stock property
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Helper function to convert Supabase product to our frontend Product type
export function mapSupabaseProduct(product: ProductFromSupabase): Product {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    category: product.category,
    featured: product.featured || false,
    stock: product.stock || 0
  };
}

// Format price to RWF currency
export function formatPrice(price: number): string {
  return `${price.toLocaleString()} RWF`;
}
