import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube, Send, CheckCircle } from 'lucide-react';

const footerLinks = {
  Products: ['Air Max', 'Air Force 1', 'Jordan', 'Running', 'Basketball'],
  Help: ['Order Status', 'Shipping', 'Returns', 'Contact Us', 'FAQ'],
  About: ['News', 'Careers', 'Sustainability', 'Investors'],
  Membership: ['Nike Plus', 'Student Discount', 'Birthday Rewards'],
};

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer id="contact" className="border-t border-white/10 mt-20">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Stay in the <span className="text-gradient-glow">Loop</span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Be the first to know about new releases, exclusive offers, and athlete stories.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glow px-6 py-3 flex items-center gap-2"
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Subscribed
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo and Social */}
          <div className="col-span-2 md:col-span-1">
            <svg 
              className="h-8 w-auto fill-foreground mb-6" 
              viewBox="0 0 24 24"
            >
              <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.494-.477-1.072-.477-1.734 0-.752.165-1.563.497-2.433.33-.87.818-1.79 1.462-2.761.644-.972 1.41-1.893 2.297-2.762.887-.87 1.873-1.628 2.96-2.274 1.087-.646 2.233-1.16 3.438-1.54 1.205-.38 2.39-.57 3.552-.57 1.163 0 2.155.218 2.978.652.822.435 1.234 1.049 1.234 1.843 0 .435-.166.816-.497 1.144-.331.327-.747.49-1.248.49-.228 0-.52-.054-.875-.163-.354-.11-.702-.163-1.043-.163-.912 0-1.874.227-2.888.68-1.014.455-1.992 1.05-2.933 1.79-.942.74-1.761 1.575-2.458 2.505-.697.93-1.13 1.87-1.3 2.82-.057.326-.086.607-.086.843 0 .544.147.964.439 1.26.293.297.695.446 1.205.446.455 0 1.01-.132 1.664-.395L24 7.8z"/>
            </svg>
            <div className="flex gap-3">
              {[Twitter, Facebook, Youtube, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-medium mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Nike, Inc. All Rights Reserved
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Settings</a>
            <a href="#" className="hover:text-foreground transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
