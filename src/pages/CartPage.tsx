
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Trash2, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="container-custom py-10">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left">Product</th>
                        <th className="py-3 px-4 text-center">Quantity</th>
                        <th className="py-3 px-4 text-right">Price</th>
                        <th className="py-3 px-4 text-right">Total</th>
                        <th className="py-3 px-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {items.map((item) => (
                        <tr key={item.product.id}>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="ml-4">
                                <Link
                                  to={`/products/${item.product.id}`}
                                  className="font-medium hover:text-brand-teal"
                                >
                                  {item.product.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="bg-gray-200 px-2 py-1 rounded-l"
                              >
                                -
                              </button>
                              <span className="bg-white border-y border-gray-200 py-1 px-3">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="bg-gray-200 px-2 py-1 rounded-r"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            ${item.product.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-right font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-between">
                  <Link
                    to="/products"
                    className="flex items-center text-brand-blue hover:text-brand-teal"
                  >
                    <ArrowLeft size={16} className="mr-2" /> Continue Shopping
                  </Link>

                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span>${(subtotal * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(subtotal * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-brand-teal hover:bg-brand-blue"
                    size="lg"
                    asChild
                  >
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
