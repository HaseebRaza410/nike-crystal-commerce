import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';
import { products, categories } from '@/data/products';
import { ProductCard } from './ProductCard';

export const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient-glow">Collection</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover our latest drops and timeless classics, designed for athletes and style seekers alike.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          {/* Desktop Category Filters */}
          <div className="hidden md:flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-panel hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Filter Dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
            >
              <Filter className="w-4 h-4" />
              {selectedCategory}
              <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 glass-panel rounded-xl overflow-hidden z-20"
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={`block w-full px-6 py-3 text-left text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary/20 text-primary'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results count */}
          <span className="text-muted-foreground text-sm ml-auto">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
