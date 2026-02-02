import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart, Share2, RotateCw } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { ChatVoiceButtons } from '@/components/ChatVoiceButtons';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/" className="btn-glow">Back to Home</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor);
  };

  const handleRotate = () => {
    setRotation(prev => prev + 45);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images / 360 Viewer */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Main Image with 360 rotation */}
              <div className="glass-card p-4 mb-4 aspect-square relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                
                {/* Radial glow behind shoe */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, hsl(197 100% 50% / 0.3) 0%, transparent 60%)'
                  }}
                />
                
                <motion.img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain relative z-10"
                  animate={{ rotate: rotation }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 178, 255, 0.3))' }}
                />
                
                {/* 360 Controls */}
                <button 
                  onClick={handleRotate}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 glass-panel px-4 py-2 rounded-full text-xs text-muted-foreground hover:bg-white/10 transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                  Rotate 360°
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-20 glass-card p-2 transition-all duration-300 ${
                      activeImageIndex === index 
                        ? 'ring-2 ring-primary' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={product.image} 
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm text-primary uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>
                <p className="text-3xl font-semibold text-gradient-glow">
                  ${product.price}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <p className="text-sm font-medium mb-3">
                  Select Color
                  {selectedColor && (
                    <span className="text-muted-foreground ml-2">
                      - {selectedColor}
                    </span>
                  )}
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color, i) => (
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
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Select Size (US)</p>
                  <button className="text-sm text-primary hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
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

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className={`flex-1 btn-glow flex items-center justify-center gap-2 ${
                    !selectedSize || !selectedColor
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`glass-panel p-4 rounded-full transition-all duration-300 ${
                    isWishlisted ? 'text-pink-500 bg-pink-500/20' : 'hover:bg-white/10'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                
                <button className="glass-panel p-4 rounded-full hover:bg-white/10 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Product Details */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="font-semibold">Product Details</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Premium leather and synthetic upper</li>
                  <li>• Air cushioning for responsive comfort</li>
                  <li>• Rubber outsole for durability and traction</li>
                  <li>• Padded collar for ankle support</li>
                  <li>• Shown: {product.colors[0] || 'Multi-color'}</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <ChatVoiceButtons />
    </div>
  );
};

export default ProductDetail;
