import { motion } from 'framer-motion';
import shoeTraining1 from '@/assets/shoe-training-1.png';
import shoeAirmax1 from '@/assets/shoe-airmax-1.png';
import shoeAirforce1 from '@/assets/shoe-airforce-1.png';

const features = [
  {
    title: 'Air Technology',
    description: 'Revolutionary cushioning that adapts to your every move.',
    image: shoeAirmax1,
  },
  {
    title: 'Flyknit Upper',
    description: 'Precision-engineered for breathability and lightweight support.',
    image: shoeTraining1,
  },
  {
    title: 'React Foam',
    description: 'Energy return that keeps you going mile after mile.',
    image: shoeAirforce1,
  },
];

export const FeaturesSection = () => {
  return (
    <section id="technology" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Innovation at <span className="text-gradient-glow">Every Step</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Decades of research and engineering come together in every pair.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 text-center group"
            >
              <div className="relative h-48 mb-6 flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle, hsl(197 100% 50% / 0.1) 0%, transparent 70%)',
                  }}
                />
                <motion.img
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
