import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';

export const QuickViewModal = () => {
  const { isQuickViewOpen, quickViewProduct, closeQuickView } = useUIStore();
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(quickViewProduct, selectedSize, selectedColor);
    closeQuickView();
    setSelectedSize(null);
    setSelectedColor(null);
  };

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] modal-glass z-50 overflow-hidden"
          >
            <div className="relative flex flex-col md:flex-row h-full md:h-auto">
              {/* Close Button */}
              <button
                onClick={closeQuickView}
                className="absolute top-4 right-4 z-10 p-2 rounded-full glass-panel hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Image */}
              <div className="relative w-full md:w-1/2 bg-gradient-to-br from-muted/30 to-muted/10 p-8 flex items-center justify-center min-h-[300px]">
                <motion.img
                  initial={{ opacity: 0, rotate: -5 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="max-w-full max-h-[300px] md:max-h-[400px] object-contain animate-float"
                />
                
                {/* 360 indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="M16 8l-4 4-4-4"/>
                    <path d="M8 16l4-4 4 4"/>
                  </svg>
                  <span>Drag to rotate</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2 p-6 md:p-8 space-y-6 overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                    {quickViewProduct.category}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {quickViewProduct.name}
                  </h2>
                  <p className="text-2xl font-semibold text-primary">
                    ${quickViewProduct.price}
                  </p>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Color Selection */}
                <div>
                  <p className="text-sm font-medium mb-3">
                    Select Color
                  </p>
                  <div className="flex gap-3">
                    {quickViewProduct.colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(color)}
                        className={`color-dot ${selectedColor === color ? 'active' : ''}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <p className="text-sm font-medium mb-3">
                    Select Size (US)
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className={`w-full btn-glow ${
                    !selectedSize || !selectedColor
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
