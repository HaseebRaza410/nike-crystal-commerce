import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Marcus Johnson',
    role: 'Marathon Runner',
    rating: 5,
    quote: "The Air Max Pulse completely changed my running game. The cushioning is unreal, and I've shaved minutes off my personal best. Worth every penny!",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Fitness Instructor',
    rating: 5,
    quote: "I wear the Metcon 9 for every training session. The stability and grip are perfect for lifting, and they look amazing too. My clients always ask about them!",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'David Thompson',
    role: 'Streetwear Enthusiast',
    rating: 5,
    quote: "The Air Force 1s are timeless. I've owned over 10 pairs in different colors. The quality and style never disappoint. Classic never goes out of style.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
];

export const CustomerReviews = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            What Athletes <span className="text-gradient-glow">Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real athletes who push their limits every day.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 relative group hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{review.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-xl border border-primary/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
