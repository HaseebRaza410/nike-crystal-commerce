import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '#products' },
  { name: 'Technology', href: '#technology' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const { openSearch } = useUIStore();
  const totalItems = getTotalItems();

  return (
    <nav className="nav-glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <svg 
              className="h-6 md:h-8 w-auto fill-foreground transition-colors hover:fill-primary" 
              viewBox="0 0 24 24"
            >
              <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.494-.477-1.072-.477-1.734 0-.752.165-1.563.497-2.433.33-.87.818-1.79 1.462-2.761.644-.972 1.41-1.893 2.297-2.762.887-.87 1.873-1.628 2.96-2.274 1.087-.646 2.233-1.16 3.438-1.54 1.205-.38 2.39-.57 3.552-.57 1.163 0 2.155.218 2.978.652.822.435 1.234 1.049 1.234 1.843 0 .435-.166.816-.497 1.144-.331.327-.747.49-1.248.49-.228 0-.52-.054-.875-.163-.354-.11-.702-.163-1.043-.163-.912 0-1.874.227-2.888.68-1.014.455-1.992 1.05-2.933 1.79-.942.74-1.761 1.575-2.458 2.505-.697.93-1.13 1.87-1.3 2.82-.057.326-.086.607-.086.843 0 .544.147.964.439 1.26.293.297.695.446 1.205.446.455 0 1.01-.132 1.664-.395L24 7.8z"/>
            </svg>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Shop Now Button - Desktop */}
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-flex btn-glow px-5 py-2 text-sm"
            >
              Shop Now
            </motion.a>

            <button
              onClick={openSearch}
              className="p-2 rounded-full transition-colors hover:bg-white/10"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full transition-colors hover:bg-white/10"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full transition-colors hover:bg-white/10"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-white/10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
