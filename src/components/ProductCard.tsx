import { motion } from 'framer-motion';
import { Product } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { openQuickView } = useUIStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card glow-border"
      onClick={() => openQuickView(product)}
    >
      <div className="product-card-image mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
        <span className="quick-view-btn">Quick View</span>
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
    </motion.div>
  );
};
