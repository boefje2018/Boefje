import React from 'react';
import { Home, Compass, Heart, ShoppingBag, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface MobileBottomNavProps {
  onGoHome: () => void;
  onGoShop: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onGoHome, onGoShop }) => {
  const { cart, wishlist, setIsWishlistOpen, setIsCartOpen, setIsAccountOpen } = useStore();

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0c0c0d]/95 backdrop-blur-md border-t border-zinc-800/80 px-4 py-2 flex items-center justify-around text-zinc-400">
      <button
        onClick={onGoHome}
        className="flex flex-col items-center gap-1 py-1 text-[10px] font-medium uppercase tracking-wider hover:text-white"
      >
        <Home size={18} />
        <span>HOME</span>
      </button>

      <button
        onClick={onGoShop}
        className="flex flex-col items-center gap-1 py-1 text-[10px] font-medium uppercase tracking-wider hover:text-white"
      >
        <Compass size={18} />
        <span>SHOP</span>
      </button>

      <button
        onClick={() => setIsWishlistOpen(true)}
        className="relative flex flex-col items-center gap-1 py-1 text-[10px] font-medium uppercase tracking-wider hover:text-white"
      >
        <Heart size={18} />
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-white ring-2 ring-[#0c0c0d]" />
        )}
        <span>WISHLIST</span>
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center gap-1 py-1 text-[10px] font-medium uppercase tracking-wider hover:text-white"
      >
        <ShoppingBag size={18} />
        {totalCartCount > 0 && (
          <span className="absolute -top-1 right-0 font-mono text-[9px] font-bold bg-white text-black min-w-4 h-4 px-0.5 rounded-full flex items-center justify-center">
            {totalCartCount}
          </span>
        )}
        <span>BAG</span>
      </button>

      <button
        onClick={() => setIsAccountOpen(true)}
        className="flex flex-col items-center gap-1 py-1 text-[10px] font-medium uppercase tracking-wider hover:text-white"
      >
        <User size={18} />
        <span>ACCOUNT</span>
      </button>
    </nav>
  );
};
