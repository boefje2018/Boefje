import React, { useState } from 'react';
import { X, Trash2, Heart, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout, onExplore }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    applyCoupon,
    removeCoupon,
    appliedCoupon
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;

    const res = applyCoupon(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c0c0d] border-l border-zinc-800 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-wider uppercase text-white">
                SHOPPING BAG
              </span>
              <span className="font-mono text-xs text-zinc-400">
                ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#141416] p-3.5 border-b border-zinc-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check size={14} /> ÜCRETSİZ STANDART KARGO KAZANDINIZ!
                </span>
              ) : (
                <span className="text-zinc-300">
                  Ücretsiz kargo için <strong className="text-white font-mono">₺{remainingForFreeShipping}</strong> daha ekleyin.
                </span>
              )}
              <span className="font-mono text-[11px] text-zinc-400">%{progressPercent}</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-zinc-800/60">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <p className="text-sm text-zinc-400 font-medium">
                  Alışveriş sepetiniz şu an boş.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExplore();
                  }}
                  className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  KOLEKSİYONU KEŞFET
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.salePrice ?? item.product.price;

                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-26 bg-zinc-900 border border-zinc-800 shrink-0 overflow-hidden">
                      <img
                        src={item.product.images.main}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-white uppercase tracking-tight line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="font-mono text-xs font-bold text-white tabular-nums">
                            ₺{(itemPrice * item.quantity).toLocaleString('tr-TR')}
                          </span>
                        </div>

                        {/* Variant Info */}
                        <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-1 font-mono">
                          <span>Beden: <strong className="text-zinc-200">{item.selectedSize}</strong></span>
                          <span>·</span>
                          <span>Renk: <strong className="text-zinc-200">{item.selectedColor.label}</strong></span>
                        </div>
                      </div>

                      {/* Quantity Stepper & Actions */}
                      <div className="flex items-center justify-between mt-3 pt-2">
                        <div className="flex items-center border border-zinc-800 bg-zinc-950">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-zinc-400 hover:text-white text-xs cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 font-mono text-xs text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-zinc-400 hover:text-white text-xs cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-3 text-zinc-400">
                          <button
                            onClick={() => toggleWishlist(item.product.id)}
                            className="hover:text-white text-xs flex items-center gap-1 cursor-pointer"
                            title="Favorilere Kaydet"
                          >
                            <Heart size={14} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="hover:text-red-400 text-xs flex items-center gap-1 cursor-pointer"
                            title="Sepetten Sil"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#0c0c0d] border-t border-zinc-800 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-zinc-900 border border-zinc-700 text-xs font-mono">
                    <div className="flex items-center gap-2 text-white">
                      <Tag size={14} />
                      <span>{appliedCoupon.code}</span>
                      <span className="text-zinc-400">
                        (-{appliedCoupon.discountPercent ? `%${appliedCoupon.discountPercent}` : `₺${appliedCoupon.discountFixed}`})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-zinc-400 hover:text-white text-[11px] underline cursor-pointer"
                    >
                      Kaldır
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        placeholder="İNDİRİM KODU (örn: WELCOME10)"
                        className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs font-mono uppercase text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-zinc-800 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      UYGULA
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400 mt-1 font-mono">{promoError}</p>
                )}
              </div>

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="text-white tabular-nums">₺{cartSubtotal.toLocaleString('tr-TR')}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>İndirim</span>
                    <span className="tabular-nums">-₺{cartDiscount.toLocaleString('tr-TR')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Kargo Ücreti</span>
                  <span className="text-white tabular-nums">
                    {cartShipping === 0 ? (
                      <strong className="text-emerald-400 uppercase font-sans text-[11px]">Ücretsiz</strong>
                    ) : (
                      `₺${cartShipping}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between pt-2 border-t border-zinc-800 text-sm font-bold text-white">
                  <span className="uppercase font-sans">GENEL TOPLAM</span>
                  <span className="tabular-nums">₺{cartTotal.toLocaleString('tr-TR')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors cursor-pointer shadow-lg"
              >
                <span>CHECKOUT (GÜVENLİ ÖDEME)</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-zinc-500 font-mono uppercase">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} /> PayTR 256-Bit SSL
                </span>
                <span>·</span>
                <span>3D Secure Güvenlik</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
