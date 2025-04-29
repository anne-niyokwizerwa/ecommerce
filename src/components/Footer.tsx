
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">TechEdge</h3>
            <p className="text-gray-300 mb-4">
              Premium tech accessories for the modern lifestyle. Enhance your tech experience with our carefully curated products.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-gray-300 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products?category=chargers" className="text-gray-300 hover:text-white transition-colors">
                  Chargers
                </Link>
              </li>
              <li>
                <Link to="/products?category=cables" className="text-gray-300 hover:text-white transition-colors">
                  Cables
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <p className="text-gray-300 mb-2">Sign up for our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 text-sm bg-brand-dark text-white rounded-l focus:outline-none"
              />
              <button className="bg-brand-teal text-white px-4 py-2 rounded-r hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
            <div className="mt-4 flex space-x-4">
              {/* Social links here - simplified for demo */}
              <a href="#" className="text-white hover:text-brand-teal">FB</a>
              <a href="#" className="text-white hover:text-brand-teal">TW</a>
              <a href="#" className="text-white hover:text-brand-teal">IG</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-gray-300 text-sm flex flex-col md:flex-row justify-between">
          <p>© {year} TechEdge. All rights reserved.</p>
          <p>Designed and developed by Anne Niyokwizerwa.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
