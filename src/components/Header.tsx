import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  onSelectCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectCategory }) => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsWishlistOpen,
    setIsAccountOpen,
    setIsAdminOpen,
    activeNavCategory,
    setActiveNavCategory
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (cat: string) => {
    setActiveNavCategory(cat);
    onSelectCategory(cat);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Slim Top Ticker Banner */}
      <div className="w-full bg-[#141416] text-[#a1a1aa] text-[11px] tracking-widest uppercase py-1.5 px-4 border-b border-[#222226] text-center font-medium flex items-center justify-center gap-6">
        <span>ÜCRETSİZ KARGO (1.000 TL ÜZERİ)</span>
        <span className="hidden md:inline text-zinc-600">·</span>
        <span className="hidden md:inline">AMSTERDAM DESIGN × AEGEAN TEXTILE MASTERY</span>
        <span className="hidden lg:inline text-zinc-600">·</span>
        <span className="hidden lg:inline">30 GÜN KOŞULSUZ DEĞİŞİM</span>
        <button
          onClick={() => setIsAdminOpen(true)}
          className="text-zinc-500 hover:text-white transition-colors text-[10px] ml-auto underline cursor-pointer"
          title="Yönetici Paneli"
        >
          Admin Portal
        </button>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#0c0c0d]/90 backdrop-blur-md py-3.5 border-zinc-800/80 shadow-2xl shadow-black/40'
            : 'bg-[#0c0c0d] py-5 border-zinc-800/40'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Hamburger (Left on mobile) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-200 hover:text-white p-2 -ml-2"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Desktop Left Nav: MEN, WOMEN, SPORTSWEAR, NEW ARRIVALS */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold tracking-wider text-zinc-300 uppercase">
            <button
              onClick={() => handleNavClick('underwear')}
              className={`hover:text-white transition-colors relative py-1 cursor-pointer ${
                activeNavCategory === 'underwear' ? 'text-white' : ''
              }`}
            >
              MEN
              {activeNavCategory === 'underwear' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('women')}
              className={`hover:text-white transition-colors relative py-1 cursor-pointer ${
                activeNavCategory === 'women' ? 'text-white' : ''
              }`}
            >
              WOMEN
              {activeNavCategory === 'women' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('sportswear')}
              className={`hover:text-white transition-colors relative py-1 cursor-pointer ${
                activeNavCategory === 'sportswear' ? 'text-white' : ''
              }`}
            >
              SPORTSWEAR
              {activeNavCategory === 'sportswear' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('new-arrivals')}
              className={`hover:text-white transition-colors relative py-1 cursor-pointer ${
                activeNavCategory === 'new-arrivals' ? 'text-white' : ''
              }`}
            >
              NEW ARRIVALS
              {activeNavCategory === 'new-arrivals' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white" />
              )}
            </button>
          </nav>

          {/* Center: BOEFJE Wordmark Logo */}
          <div className="flex-1 md:flex-initial text-center md:text-center">
            <button
              onClick={() => handleNavClick('all')}
              className="group cursor-pointer inline-flex flex-col items-center focus:outline-none"
            >
              <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-[0.22em] text-white transition-transform group-hover:scale-[1.02]">
                BOEFJE
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-400 font-medium uppercase mt-0.5">
                UNDERWEAR & SPORTSWEAR
              </span>
            </button>
          </div>

          {/* Right Action Controls: Search, Account, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-4 text-zinc-300">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-white transition-colors cursor-pointer rounded-sm hover:bg-zinc-800/40"
              aria-label="Arama"
              title="Arama"
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            {/* Account (Hidden on small mobile) */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="hidden sm:inline-flex p-2 hover:text-white transition-colors cursor-pointer rounded-sm hover:bg-zinc-800/40"
              aria-label="Hesabım"
              title="Hesabım"
            >
              <User size={20} strokeWidth={1.8} />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="hidden sm:inline-flex p-2 hover:text-white transition-colors relative cursor-pointer rounded-sm hover:bg-zinc-800/40"
              aria-label="Favoriler"
              title="Favoriler"
            >
              <Heart size={20} strokeWidth={1.8} />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1 w-2 h-2 rounded-full bg-white ring-2 ring-[#0c0c0d]" />
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:text-white transition-colors relative cursor-pointer flex items-center gap-2 rounded-sm hover:bg-zinc-800/40"
              aria-label="Sepet"
              title="Alışveriş Sepeti"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {totalCartCount > 0 && (
                <span className="font-mono text-xs font-bold bg-white text-black min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0c0c0d] border-b border-zinc-800 px-6 py-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col space-y-4 text-base font-semibold tracking-wider uppercase text-zinc-300">
              <button
                onClick={() => handleNavClick('underwear')}
                className="text-left py-2 hover:text-white flex items-center justify-between border-b border-zinc-800/60"
              >
                <span>MEN UNDERWEAR</span>
                <span className="text-xs text-zinc-500">Koleksiyon</span>
              </button>
              <button
                onClick={() => handleNavClick('women')}
                className="text-left py-2 hover:text-white flex items-center justify-between border-b border-zinc-800/60"
              >
                <span>WOMEN UNDERWEAR</span>
                <span className="text-xs text-zinc-500">Yeni</span>
              </button>
              <button
                onClick={() => handleNavClick('sportswear')}
                className="text-left py-2 hover:text-white flex items-center justify-between border-b border-zinc-800/60"
              >
                <span>SPORTSWEAR & TRAINING</span>
                <span className="text-xs text-zinc-500">Performans</span>
              </button>
              <button
                onClick={() => handleNavClick('new-arrivals')}
                className="text-left py-2 hover:text-white flex items-center justify-between border-b border-zinc-800/60"
              >
                <span>NEW ARRIVALS</span>
                <span className="text-xs text-zinc-500">Son Çıkanlar</span>
              </button>
            </div>

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccountOpen(true);
                }}
                className="w-full text-left py-2 text-sm text-zinc-400 hover:text-white flex items-center gap-3"
              >
                <User size={18} />
                <span>Hesabım ve Siparişlerim</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="w-full text-left py-2 text-sm text-zinc-400 hover:text-white flex items-center gap-3"
              >
                <Heart size={18} />
                <span>Favorilerim ({wishlist.length})</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full text-left py-2 text-sm text-zinc-400 hover:text-white flex items-center gap-3"
              >
                <ShieldCheck size={18} />
                <span>Mağaza Yönetim Paneli</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
