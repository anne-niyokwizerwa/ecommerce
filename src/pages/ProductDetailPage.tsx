
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product, mapSupabaseProduct, formatPrice } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        setLoading(true);
        
        // Fetch the current product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();
        
        if (productError) {
          throw productError;
        }
        
        if (!productData) {
          navigate("/products");
          return;
        }
        
        const mappedProduct = mapSupabaseProduct(productData);
        setProduct(mappedProduct);
        
        // Fetch related products (same category, excluding current product)
        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('category', productData.category)
          .neq('id', productId)
          .limit(3);
        
        if (relatedError) {
          throw relatedError;
        }
        
        if (relatedData) {
          setRelatedProducts(relatedData.map(mapSupabaseProduct));
        }
        
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Failed to load product details. Please try again later.",
          variant: "destructive"
        });
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate, toast]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="container-custom py-10">
          <Link to="/products" className="inline-flex items-center text-brand-blue hover:text-brand-teal mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
          </Link>

          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Product Details */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl font-semibold text-brand-blue mb-4">
                  {formatPrice(product.price)}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 px-3 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="bg-white border-y border-gray-200 py-1 px-4">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-brand-blue hover:bg-brand-teal"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="product-card">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <div className="overflow-hidden">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="product-image hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg mb-1">{relatedProduct.name}</h3>
                        <p className="text-brand-blue font-semibold">
                          {formatPrice(relatedProduct.price)}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
