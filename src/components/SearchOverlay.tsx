import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { products } from '@/data/products';

export const SearchOverlay = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useUIStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions] = useState(['Air Max', 'Air Force 1', 'Running', 'Basketball', 'Training']);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeSearch]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="search-overlay"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-3xl mx-4"
          >
            {/* Search Input */}
            <div className="relative">
              <div className="glass-panel rounded-2xl p-2 flex items-center gap-4">
                <Search className="w-6 h-6 ml-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-lg outline-none py-4 placeholder:text-muted-foreground"
                />
                <button
                  onClick={closeSearch}
                  className="p-3 rounded-full hover:bg-white/10 transition-colors mr-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Glow Effect */}
              <div 
                className="absolute inset-0 -z-10 rounded-2xl opacity-50 blur-xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(197 100% 50% / 0.2), transparent, hsl(165 100% 50% / 0.2))',
                }}
              />
            </div>

            {/* Quick Suggestions */}
            {!searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6"
              >
                <p className="text-sm text-muted-foreground mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="glass-panel px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Search Results */}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 glass-panel rounded-2xl overflow-hidden max-h-[400px] overflow-y-auto"
              >
                {filteredProducts.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={closeSearch}
                        className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
                      >
                        <div className="w-16 h-16 rounded-lg bg-muted/30 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <p className="font-semibold">${product.price}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No products found</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Try a different search term
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
