import {
  AlignLeft,
  ChevronDown,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white z-50">
      {/* Top Row: Menu, Logo, Utility Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Left: Mobile/Tablet Menu Icon */}
          <div className="flex items-center">
            <button className="p-2 -ml-2 text-gray-800 hover:text-black">
              <AlignLeft size={24} strokeWidth={2} />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 text-center">
            <Link
              to="/"
              className="font-sans text-2xl font-bold tracking-wider text-black"
            >
              SHOPSMART
            </Link>
          </div>

          {/* Right: Links & Icons */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
              <Link to="/about" className="hover:text-black">
                About Us
              </Link>
              <Link to="/blog" className="hover:text-black">
                Blog
              </Link>
              <Link to="/faq" className="hover:text-black">
                FAQ
              </Link>
            </div>
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6 ml-2">
              <Link
                to="/profile"
                aria-label="profile"
                className="text-gray-800 hover:text-black"
              >
                <User size={20} strokeWidth={2} />
              </Link>
              <Link
                to="/cart"
                aria-label="cart"
                className="text-gray-800 hover:text-black relative"
              >
                <ShoppingBag size={20} strokeWidth={2} />
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Search, Categories, Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Clothing"
              className="w-full bg-gray-50 rounded-full py-2.5 pl-5 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-gray-200"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          {/* Navigation Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto scrollbar-hide py-1">
            <Link
              to="/collections"
              className="flex items-center space-x-1 px-4 py-2 bg-gray-50 rounded-full text-sm font-medium whitespace-nowrap"
            >
              <span>Clothing</span>
              <ChevronDown size={14} />
            </Link>

            {["New Arrivals", "Sales", "Men", "Women", "Kid's", "Brand"].map(
              (item) => (
                <Link
                  key={item}
                  to="/collections"
                  className="px-5 py-2 hover:bg-gray-50 rounded-full text-sm font-medium text-gray-600 hover:text-black whitespace-nowrap transition-colors"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
