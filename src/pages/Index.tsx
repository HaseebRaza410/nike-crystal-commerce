import { Navbar } from '@/components/Navbar';
import { HeroVideo } from '@/components/HeroVideo';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CustomerReviews } from '@/components/CustomerReviews';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { SearchOverlay } from '@/components/SearchOverlay';
import { ChatVoiceButtons } from '@/components/ChatVoiceButtons';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroVideo />
        <Hero />
        <ProductGrid />
        <FeaturesSection />
        <CustomerReviews />
      </main>
      <Footer />
      
      {/* Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SearchOverlay />
      <ChatVoiceButtons />
    </div>
  );
};

export default Index;
