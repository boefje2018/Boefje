import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product, Size } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showQuickAddSizes, setShowQuickAddSizes] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleQuickAdd = (size: Size, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, currentColor, size, 1);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setShowQuickAddSizes(false);
    }, 900);
  };

  return (
    <div
      className="group relative flex flex-col bg-[#111113] border border-zinc-900/80 hover:border-zinc-700/80 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAddSizes(false);
      }}
    >
      {/* Visual Slot */}
      <div
        onClick={() => onOpenDetail(product)}
        className="relative w-full aspect-[3/4] bg-[#161618] overflow-hidden cursor-pointer"
      >
        {/* Main Image */}
        <img
          src={product.images.main}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
            isHovered && product.images.back ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Hover Secondary Image (Back / Lifestyle Angle) */}
        {product.images.back && (
          <img
            src={product.images.back}
            alt={`${product.name} alternate view`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-200 cursor-pointer ${
            isFavorited
              ? 'bg-white text-black'
              : 'bg-black/50 backdrop-blur-xs text-white hover:bg-white hover:text-black'
          }`}
          aria-label={isFavorited ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
        >
          <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>

        {/* Badge: New or Best Seller (Clean text, not pill sandwich) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="text-[10px] uppercase font-bold tracking-widest bg-black/80 backdrop-blur-xs text-zinc-200 px-2 py-0.5 border border-zinc-800">
              BEST SELLER
            </span>
          )}
          {product.isNew && (
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white text-black px-2 py-0.5">
              NEW
            </span>
          )}
        </div>

        {/* Quick Add Overlay Slide-up */}
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-black/90 backdrop-blur-md p-3 transition-transform duration-300 border-t border-zinc-800 ${
            showQuickAddSizes
              ? 'translate-y-0 opacity-100'
              : isHovered
              ? 'translate-y-0 opacity-100 md:block hidden'
              : 'translate-y-full opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {showQuickAddSizes ? (
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
                <span>SELECT SIZE ({currentColor.label})</span>
                <button
                  onClick={() => setShowQuickAddSizes(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {product.sizes.map((sz) => {
                  const variantKey = `${currentColor.name}-${sz}`;
                  const stock = product.stockByVariant[variantKey] ?? 10;
                  const isSoldOut = stock <= 0;

                  return (
                    <button
                      key={sz}
                      disabled={isSoldOut}
                      onClick={(e) => handleQuickAdd(sz, e)}
                      className={`py-1.5 text-xs font-mono font-medium border text-center transition-all ${
                        isSoldOut
                          ? 'border-zinc-800 text-zinc-600 line-through cursor-not-allowed'
                          : 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-white hover:text-black hover:border-white cursor-pointer'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowQuickAddSizes(true)}
              className="w-full py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              {addedAnimation ? (
                <>
                  <Check size={14} />
                  <span>EKLENDİ</span>
                </>
              ) : (
                <>
                  <Plus size={14} />
                  <span>QUICK ADD</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Product Card Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIndex(idx);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColorIndex === idx ? 'ring-2 ring-white ring-offset-2 ring-offset-[#111113]' : 'opacity-70'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                  aria-label={c.label}
                />
              ))}
              <span className="text-[11px] text-zinc-500 ml-1 font-mono">
                {product.colors.length} renk
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            onClick={() => onOpenDetail(product)}
            className="font-medium text-sm sm:text-base text-zinc-100 hover:text-white transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Subtitle / Key feature */}
          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Mobile Quick Add */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
          <div className="flex items-center gap-2 font-mono">
            {product.salePrice ? (
              <>
                <span className="text-sm font-semibold text-white tabular-nums">
                  ₺{product.salePrice.toLocaleString('tr-TR')}
                </span>
                <span className="text-xs text-zinc-500 line-through tabular-nums">
                  ₺{product.price.toLocaleString('tr-TR')}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-white tabular-nums">
                ₺{product.price.toLocaleString('tr-TR')}
              </span>
            )}
          </div>

          {/* Mobile Direct Add Trigger Button */}
          <button
            onClick={() => setShowQuickAddSizes(true)}
            className="md:hidden p-1.5 text-zinc-300 hover:text-white bg-zinc-800 rounded-sm"
            aria-label="Hızlı Ekle"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
