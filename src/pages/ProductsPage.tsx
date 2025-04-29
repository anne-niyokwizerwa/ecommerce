
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Product, mapSupabaseProduct } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";

// Define categories for the sidebar
const categories = [
  { id: "all", name: "All Products" },
  { id: "smartphones", name: "Smartphones" },
  { id: "audio", name: "Audio" },
  { id: "computers", name: "Computers" },
  { id: "wearables", name: "Wearables" },
  { id: "gaming", name: "Gaming" },
  { id: "accessories", name: "Accessories" }
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let query = supabase.from('products').select('*');
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        if (data) {
          const mappedProducts = data.map(mapSupabaseProduct);
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  // Get category from URL params and filter products
  useEffect(() => {
    const categoryParam = searchParams.get("category") || "all";
    setActiveCategory(categoryParam);
    
    const filtered = categoryParam === "all"
      ? products
      : products.filter(product => product.category === categoryParam);
    
    setFilteredProducts(filtered);
  }, [searchParams, products]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryId);
    }
    setSearchParams(searchParams);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryProducts = activeCategory === "all" 
      ? products 
      : products.filter(product => product.category === activeCategory);
      
    const filtered = searchTerm 
      ? categoryProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : categoryProducts;
    
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-brand-light py-10">
          <div className="container-custom">
            <h1 className="text-3xl font-bold mb-2">Our Products</h1>
            <p className="text-gray-600">Browse our collection of premium tech accessories</p>
          </div>
        </section>

        <section className="container-custom py-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filter */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition ${
                        activeCategory === category.id
                          ? "bg-brand-blue text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Search</h3>
                  <form onSubmit={handleSearch}>
                    <div className="flex">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search products..."
                        className="px-3 py-2 border rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                      <Button type="submit" className="rounded-l-none">
                        Go
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="md:w-3/4">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-gray-600 mt-2">Try changing your search or category filter</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
