import React from 'react';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface WishlistDrawerProps {
  onOpenProduct: (product: Product) => void;
  onExplore: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onOpenProduct, onExplore }) => {
  const { wishlist, products, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useStore();

  if (!isWishlistOpen) return null;

  const favoritedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c0c0d] border-l border-zinc-800 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={18} className="text-white fill-white" />
              <span className="font-display text-lg font-bold tracking-wider uppercase text-white">
                FAVORİLERİM
              </span>
              <span className="font-mono text-xs text-zinc-400">
                ({favoritedProducts.length})
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {favoritedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <Heart size={36} className="mx-auto text-zinc-700" />
                <p className="text-sm text-zinc-400">Favori listenizde ürün bulunmuyor.</p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    onExplore();
                  }}
                  className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  ÜRÜNLERİ KEŞFET
                </button>
              </div>
            ) : (
              favoritedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 bg-[#141416] border border-zinc-800 flex gap-4 items-center justify-between"
                >
                  <div
                    onClick={() => {
                      setIsWishlistOpen(false);
                      onOpenProduct(prod);
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <img
                      src={prod.images.main}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-white line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                        ₺{(prod.salePrice ?? prod.price).toLocaleString('tr-TR')}
                      </p>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase">
                        {prod.colors.length} Renk · {prod.sizes.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        addToCart(prod, prod.colors[0], prod.sizes[1] || prod.sizes[0], 1);
                      }}
                      className="p-2 bg-white text-black hover:bg-zinc-200 transition-colors text-xs font-bold uppercase flex items-center justify-center cursor-pointer"
                      title="Sepete Ekle"
                    >
                      <ShoppingBag size={14} />
                    </button>
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="p-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors text-xs flex items-center justify-center cursor-pointer"
                      title="Listeden Kaldır"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
