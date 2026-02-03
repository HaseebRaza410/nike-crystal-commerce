import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { products as productsData } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { openQuickView } = useUIStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  // Get product with images for hover effect
  const productWithImages = productsData.find(p => p.id === product.id);
  const hoverImage = productWithImages?.images?.[1] || product.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card glow-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <div className="product-card-image mb-4 relative overflow-hidden">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain absolute inset-0"
            loading="lazy"
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.img 
            src={hoverImage} 
            alt={`${product.name} - alternate view`}
            className="w-full h-full object-contain absolute inset-0"
            loading="lazy"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <button 
            onClick={handleQuickView}
            className="quick-view-btn"
          >
            Quick View
          </button>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-semibold">${product.price}</p>
          
          <div className="flex gap-1.5 pt-2">
            {product.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
