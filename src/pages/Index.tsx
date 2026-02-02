import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { FeaturesSection } from '@/components/FeaturesSection';
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
        <Hero />
        <ProductGrid />
        <FeaturesSection />
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
