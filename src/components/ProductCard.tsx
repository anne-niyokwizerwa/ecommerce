
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product, formatPrice } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card group">
      <Link to={`/products/${product.id}`}>
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="product-image group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg mb-1">{product.name}</h3>
          <p className="text-brand-blue font-semibold">{formatPrice(product.price)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <Button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="w-full bg-brand-blue hover:bg-brand-teal transition-colors"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
