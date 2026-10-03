import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeCalculatorModal } from './components/SizeCalculatorModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchOverlay } from './components/SearchOverlay';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountModal } from './components/AccountModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { BrandStorySection } from './components/BrandStorySection';
import { JournalSection } from './components/JournalSection';
import { InstagramFeed } from './components/InstagramFeed';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Product, ProductColor, Size } from './types';
import { Check } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    products,
    selectedProduct,
    setSelectedProduct,
    isSizeCalcOpen,
    setIsSizeCalcOpen,
    isSizeGuideOpen,
    setIsSizeGuideOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    setIsAccountOpen,
    isAdminOpen,
    setIsAdminOpen,
    notification,
    activeNavCategory,
    setActiveNavCategory,
    addToCart
  } = useStore();

  const [directCheckoutItem, setDirectCheckoutItem] = useState<{
    product: Product;
    color: ProductColor;
    size: Size;
    quantity: number;
  } | null>(null);

  const handleSelectCategory = (cat: string) => {
    setActiveNavCategory(cat);
    const element = document.getElementById('products-catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopUnderwear = () => {
    setActiveNavCategory('underwear');
    const el = document.getElementById('products-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShopSportswear = () => {
    setActiveNavCategory('sportswear');
    const el = document.getElementById('products-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuyNow = (product: Product, color: ProductColor, size: Size, quantity: number) => {
    addToCart(product, color, size, quantity);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0d] text-[#f3f3f3] flex flex-col relative pb-16 md:pb-0">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-60 bg-white text-black px-4 py-3 text-xs font-mono font-bold uppercase shadow-2xl flex items-center gap-2 border border-black animate-slideIn">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Header */}
      <Header onSelectCategory={handleSelectCategory} />

      {/* Hero Section */}
      <Hero
        onShopUnderwear={handleShopUnderwear}
        onShopSportswear={handleShopSportswear}
      />

      {/* Category Section */}
      <CategoryShowcase onSelectCategory={handleSelectCategory} />

      {/* Product Grid & Catalog */}
      <ProductGrid
        products={products}
        onOpenDetail={(p) => setSelectedProduct(p)}
        categoryFilter={activeNavCategory}
        onFilterChange={setActiveNavCategory}
        title={
          activeNavCategory === 'underwear'
            ? 'UNDERWEAR COLLECTION'
            : activeNavCategory === 'sportswear'
            ? 'SPORTSWEAR & TRAINING'
            : activeNavCategory === 'new-arrivals'
            ? 'NEW ARRIVALS'
            : 'BEST SELLERS'
        }
      />

      {/* Brand Story Editorial Section */}
      <BrandStorySection />

      {/* Boefje Journal Editorial */}
      <JournalSection />

      {/* Community / Instagram Gallery */}
      <InstagramFeed />

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        onGoHome={() => {
          setActiveNavCategory('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoShop={() => {
          const el = document.getElementById('products-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenSizeCalc={() => setIsSizeCalcOpen(true)}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onBuyNow={handleBuyNow}
        />
      )}

      {isSizeCalcOpen && (
        <SizeCalculatorModal
          onClose={() => setIsSizeCalcOpen(false)}
        />
      )}

      {isSizeGuideOpen && (
        <SizeGuideModal
          onClose={() => setIsSizeGuideOpen(false)}
        />
      )}

      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExplore={() => {
          const el = document.getElementById('products-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {isCheckoutOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutOpen(false)}
          onViewOrderInAccount={() => setIsAccountOpen(true)}
        />
      )}

      <SearchOverlay
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <WishlistDrawer
        onOpenProduct={(p) => setSelectedProduct(p)}
        onExplore={() => {
          const el = document.getElementById('products-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {useStore().isAccountOpen && (
        <AccountModal
          onClose={() => setIsAccountOpen(false)}
          onOpenWishlist={() => useStore().setIsWishlistOpen(true)}
        />
      )}

      {isAdminOpen && (
        <AdminPanelModal
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
