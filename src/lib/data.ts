
import { Product } from "./types";

// Mock data for our products
export const products: Product[] = [
  {
    id: "1",
    name: "Premium Tech Stand",
    description: "Elegant aluminum laptop stand for better ergonomics and cooling.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "accessories",
    featured: true,
    stock: 25
  },
  {
    id: "2",
    name: "Wireless Charging Pad",
    description: "Fast 15W wireless charging pad with sleek minimalist design.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    category: "chargers",
    featured: true,
    stock: 42
  },
  {
    id: "3",
    name: "Ultra Slim Power Bank",
    description: "10,000mAh power bank with USB-C fast charging and premium metal finish.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "power",
    featured: false,
    stock: 18
  },
  {
    id: "4",
    name: "Premium Headphone Stand",
    description: "Minimalist headphone stand with integrated cable management.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
    category: "accessories",
    featured: true,
    stock: 30
  },
  {
    id: "5",
    name: "Precision Stylus",
    description: "High-precision stylus for tablets and touchscreen devices with palm rejection.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    category: "accessories",
    featured: false,
    stock: 15
  },
  {
    id: "6",
    name: "Braided USB-C Cable",
    description: "Premium braided USB-C cable with 100W charging capability.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "cables",
    featured: false,
    stock: 50
  },
  {
    id: "7",
    name: "Mechanical Keyboard",
    description: "Compact mechanical keyboard with customizable RGB lighting.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    category: "input",
    featured: true,
    stock: 12
  },
  {
    id: "8",
    name: "Smart USB Hub",
    description: "4-port USB hub with smart charging and data transfer capabilities.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "accessories",
    featured: false,
    stock: 22
  }
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "accessories", name: "Accessories" },
  { id: "chargers", name: "Chargers" },
  { id: "power", name: "Power" },
  { id: "cables", name: "Cables" },
  { id: "input", name: "Input Devices" }
];

export const featuredProducts = products.filter(product => product.featured);

// Function to get products by category
export const getProductsByCategory = (category: string) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

// Function to get a product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};
