import React, { useState } from 'react';
import {
  X,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ZoomIn,
  Sparkles
} from 'lucide-react';
import { Product, Size, ProductColor, Review } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onOpenSizeCalc: () => void;
  onOpenSizeGuide: () => void;
  onBuyNow: (product: Product, color: ProductColor, size: Size, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenSizeCalc,
  onOpenSizeGuide,
  onBuyNow
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageKey, setActiveImageKey] = useState<keyof typeof product.images>('main');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    materials: false,
    fit: false,
    care: false,
    shipping: false,
    reviews: false
  });

  // Review submission simulation
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const isFavorited = isInWishlist(product.id);

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const galleryImages: Array<{ key: keyof typeof product.images; label: string; src: string }> = [
    { key: 'main', label: 'Overview', src: product.images.main },
    { key: 'front', label: 'Front', src: product.images.front },
    { key: 'back', label: 'Back', src: product.images.back },
    { key: 'side', label: 'Side', src: product.images.side },
    { key: 'detail', label: 'Detail', src: product.images.detail },
    ...(product.images.lifestyle
      ? [{ key: 'lifestyle' as const, label: 'Lifestyle', src: product.images.lifestyle }]
      : [])
  ];

  const currentImageSrc = product.images[activeImageKey] || product.images.main;

  const currentVariantKey = `${selectedColor.name}-${selectedSize}`;
  const currentStock = product.stockByVariant[currentVariantKey] ?? 12;
  const isOutOfStock = currentStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleDirectBuyNow = () => {
    if (isOutOfStock) return;
    onBuyNow(product, selectedColor, selectedSize, quantity);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      title: newReviewTitle || 'Mükemmel Kalite',
      comment: newReviewComment,
      date: 'Bugün',
      verified: true,
      fitFeedback: 'True to size'
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setShowReviewForm(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 lg:p-10 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Container */}
      <div className="relative w-full max-w-6xl min-h-screen md:min-h-0 bg-[#0c0c0d] border-0 md:border md:border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:my-auto max-h-[92vh]">
        {/* Sticky Top Bar on Modal */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0c0c0d]/95 backdrop-blur-md border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-widest uppercase text-zinc-400">
              SKU: {product.sku}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs tracking-wider uppercase text-zinc-300 font-semibold">
              {product.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Kapat"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT COLUMN: Gallery & Lightbox */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Main Image with Zoom Trigger */}
              <div
                onClick={() => setLightboxOpen(true)}
                className="group relative w-full aspect-[4/5] bg-zinc-950 overflow-hidden cursor-zoom-in border border-zinc-900"
              >
                <img
                  src={currentImageSrc}
                  alt={`${product.name} - ${activeImageKey}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-xs text-zinc-300 text-xs px-3 py-1.5 flex items-center gap-2 pointer-events-none">
                  <ZoomIn size={14} />
                  <span>BÜYÜTMEK İÇİN TIKLAYIN</span>
                </div>
              </div>

              {/* Thumbnail Selector */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {galleryImages.map((img) => (
                  <button
                    key={img.key}
                    onClick={() => setActiveImageKey(img.key)}
                    className={`relative aspect-[4/5] bg-zinc-900 overflow-hidden border transition-all cursor-pointer ${
                      activeImageKey === img.key
                        ? 'border-white ring-1 ring-white'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <span className="absolute bottom-1 inset-x-0 text-[9px] font-mono uppercase text-center bg-black/60 text-zinc-300 py-0.5">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Contiguous Purchase Module */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Brand & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-400">
                    BOEFJE ATELIER
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                    <div className="flex text-white">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="font-mono font-medium">{product.rating}</span>
                    <span className="text-zinc-500 font-mono">({reviewsList.length})</span>
                  </div>
                </div>

                {/* Product Name */}
                <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-2">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4 font-mono">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl font-bold text-white tabular-nums">
                        ₺{product.salePrice.toLocaleString('tr-TR')}
                      </span>
                      <span className="text-base text-zinc-500 line-through tabular-nums">
                        ₺{product.price.toLocaleString('tr-TR')}
                      </span>
                      <span className="text-xs uppercase font-bold text-white bg-zinc-800 px-2 py-0.5">
                        KAMPANYA
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-white tabular-nums">
                      ₺{product.price.toLocaleString('tr-TR')}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* COLOR SELECTOR */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2.5">
                    <span>RENK: <strong className="text-white">{selectedColor.label}</strong></span>
                    <span className="text-zinc-500 font-mono text-[11px]">{selectedColor.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`group relative flex items-center gap-2 px-3 py-2 border transition-all cursor-pointer ${
                          selectedColor.name === c.name
                            ? 'border-white bg-zinc-900 text-white'
                            : 'border-zinc-800 bg-transparent text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/30"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-xs font-medium">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* SIZE SELECTOR with "What's my size?" & "Size Guide" */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2.5">
                    <span>BEDEN SEÇİMİ</span>
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <button
                        onClick={onOpenSizeCalc}
                        className="text-white underline hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles size={13} />
                        <span>What's My Size?</span>
                      </button>
                      <button
                        onClick={onOpenSizeGuide}
                        className="text-zinc-400 underline hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Ruler size={13} />
                        <span>Beden Tablosu</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map((sz) => {
                      const vKey = `${selectedColor.name}-${sz}`;
                      const stock = product.stockByVariant[vKey] ?? 10;
                      const isSold = stock <= 0;

                      return (
                        <button
                          key={sz}
                          disabled={isSold}
                          onClick={() => setSelectedSize(sz)}
                          className={`py-3 text-xs font-mono font-bold uppercase border transition-all cursor-pointer ${
                            isSold
                              ? 'border-zinc-900 text-zinc-600 line-through cursor-not-allowed bg-zinc-950'
                              : selectedSize === sz
                              ? 'border-white bg-white text-black'
                              : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-600 hover:text-white'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>

                  {/* Stock notice */}
                  <div className="mt-2 text-[11px] font-mono">
                    {isOutOfStock ? (
                      <span className="text-red-400 font-bold uppercase">SEÇİLEN VARYANT TÜKENDİ</span>
                    ) : currentStock < 8 ? (
                      <span className="text-amber-400">Son {currentStock} adet kaldı (Hızlı Tükeniyor)</span>
                    ) : (
                      <span className="text-emerald-400">✓ Stokta var · Aynı gün kargoda</span>
                    )}
                  </div>
                </div>

                {/* QUANTITY & ACTIONS */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-zinc-800 bg-zinc-900">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-3 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-4 py-3 font-mono text-xs font-bold text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                        className="px-3.5 py-3 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      disabled={isOutOfStock}
                      onClick={handleAddToCart}
                      className={`flex-1 py-3.5 px-6 text-xs font-bold uppercase tracking-widest text-center transition-all cursor-pointer ${
                        isOutOfStock
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-white text-black hover:bg-zinc-200'
                      }`}
                    >
                      {isOutOfStock ? 'STOKTA YOK' : 'SEPETE EKLE'}
                    </button>

                    {/* Wishlist button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-3.5 border transition-all cursor-pointer ${
                        isFavorited
                          ? 'border-white bg-white text-black'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600 hover:text-white'
                      }`}
                      aria-label="Favori"
                    >
                      <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Buy Now (Immediate Checkout) */}
                  <button
                    disabled={isOutOfStock}
                    onClick={handleDirectBuyNow}
                    className="w-full py-3.5 text-xs font-bold uppercase tracking-widest text-center border border-white text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                  >
                    HEMEN SATIN AL
                  </button>
                </div>

                {/* Trust Highlights */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-zinc-800/80 text-[11px] text-zinc-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-zinc-200" />
                    <span>Ücretsiz Hızlı Kargo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw size={16} className="text-zinc-200" />
                    <span>30 Gün Değişim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-zinc-200" />
                    <span>PayTR 3D Secure</span>
                  </div>
                </div>
              </div>

              {/* ACCORDION SECTIONS */}
              <div className="divide-y divide-zinc-800/80 mt-6 border-b border-zinc-800/80">
                {/* 1. Product Details */}
                <div>
                  <button
                    onClick={() => toggleAccordion('details')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white cursor-pointer"
                  >
                    <span>PRODUCT DETAILS & HIGHLIGHTS</span>
                    {openAccordions.details ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordions.details && (
                    <div className="pb-4 text-xs text-zinc-400 space-y-2">
                      <ul className="space-y-1.5 list-disc list-inside">
                        {product.features.map((feat, i) => (
                          <li key={i}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 2. Materials */}
                <div>
                  <button
                    onClick={() => toggleAccordion('materials')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white cursor-pointer"
                  >
                    <span>MATERIALS & SUSTAINABILITY</span>
                    {openAccordions.materials ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordions.materials && (
                    <div className="pb-4 text-xs text-zinc-400 leading-relaxed">
                      <p className="font-semibold text-zinc-200 mb-1">{product.materials}</p>
                      <p>
                        Boefje, karbon ayak izini en aza indirmek için FSC sertifikalı Avusturya ormanlarından sağlanan Lenzing™ mikromodal liflerini ve sertifikalı Ege organik pamuğunu kullanır.
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Fit Guide */}
                <div>
                  <button
                    onClick={() => toggleAccordion('fit')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white cursor-pointer"
                  >
                    <span>FIT & ERGONOMICS</span>
                    {openAccordions.fit ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordions.fit && (
                    <div className="pb-4 text-xs text-zinc-400 leading-relaxed">
                      <p>{product.fit}</p>
                    </div>
                  )}
                </div>

                {/* 4. Care Instructions */}
                <div>
                  <button
                    onClick={() => toggleAccordion('care')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white cursor-pointer"
                  >
                    <span>CARE INSTRUCTIONS</span>
                    {openAccordions.care ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordions.care && (
                    <div className="pb-4 text-xs text-zinc-400 leading-relaxed">
                      <p>{product.care}</p>
                    </div>
                  )}
                </div>

                {/* 5. Shipping & Returns */}
                <div>
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white cursor-pointer"
                  >
                    <span>SHIPPING & RETURNS</span>
                    {openAccordions.shipping ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordions.shipping && (
                    <div className="pb-4 text-xs text-zinc-400 leading-relaxed space-y-1.5">
                      <p>• Hafta içi saat 16:00'a kadar verilen siparişler aynı gün kargoya teslim edilir.</p>
                      <p>• Yurtiçi Kargo güvencesiyle 1-2 iş günü içinde kapınızda.</p>
                      <p>• Hijyen bantları açılmamış ürünlerde 30 gün ücretsiz değişim ve iade hakkı.</p>
                    </div>
                  )}
                </div>

                {/* 6. Customer Reviews */}
                <div>
                  <button
                    onClick={() => toggleAccordion('reviews')}
                    className="w-full py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white cursor-pointer"
                  >
                    <span>REVIEWS & FEEDBACK ({reviewsList.length})</span>
                    {openAccordions.reviews ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordions.reviews && (
                    <div className="pb-4 text-xs text-zinc-400 space-y-4">
                      {/* Review List */}
                      {reviewsList.length === 0 ? (
                        <p className="italic">Bu ürün için henüz yorum yapılmamış.</p>
                      ) : (
                        reviewsList.map((rev) => (
                          <div key={rev.id} className="p-3 bg-zinc-900 border border-zinc-800 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{rev.author}</span>
                                {rev.verified && (
                                  <span className="text-[10px] text-emerald-400 font-mono">
                                    [Onaylı Alıcı]
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-zinc-500 font-mono">{rev.date}</span>
                            </div>
                            <div className="flex text-white">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} size={12} fill="currentColor" />
                              ))}
                            </div>
                            <p className="font-semibold text-zinc-200">{rev.title}</p>
                            <p className="text-zinc-300">{rev.comment}</p>
                          </div>
                        ))
                      )}

                      {/* Add Review Trigger */}
                      {!showReviewForm ? (
                        <button
                          onClick={() => setShowReviewForm(true)}
                          className="w-full py-2 text-xs font-bold uppercase tracking-wider border border-zinc-700 text-zinc-200 hover:text-white hover:border-white transition-colors cursor-pointer"
                        >
                          DENEYİMİNİZİ PAYLAŞIN (YORUM YAZ)
                        </button>
                      ) : (
                        <form onSubmit={handleAddReview} className="p-4 bg-zinc-900 border border-zinc-800 space-y-3">
                          <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                            Yorum Bırakın
                          </h4>
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">
                              İsminiz
                            </label>
                            <input
                              type="text"
                              required
                              value={newReviewAuthor}
                              onChange={(e) => setNewReviewAuthor(e.target.value)}
                              placeholder="Örn: Mehmet T."
                              className="w-full bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white"
                            />
                          </div>

                          <div className="flex items-center gap-4">
                            <div>
                              <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">
                                Puanınız
                              </label>
                              <select
                                value={newReviewRating}
                                onChange={(e) => setNewReviewRating(Number(e.target.value))}
                                className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-white"
                              >
                                <option value={5}>5 Yıldız (Kusursuz)</option>
                                <option value={4}>4 Yıldız (Çok İyi)</option>
                                <option value={3}>3 Yıldız (Ortalama)</option>
                              </select>
                            </div>
                            <div className="flex-1">
                              <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">
                                Başlık
                              </label>
                              <input
                                type="text"
                                value={newReviewTitle}
                                onChange={(e) => setNewReviewTitle(e.target.value)}
                                placeholder="Örn: Çok rahat ve şık"
                                className="w-full bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1">
                              Yorumunuz
                            </label>
                            <textarea
                              required
                              rows={3}
                              value={newReviewComment}
                              onChange={(e) => setNewReviewComment(e.target.value)}
                              placeholder="Kumaş dokusu, beden uyumu ve hissi hakkında bilgi verin..."
                              className="w-full bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white"
                            />
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 cursor-pointer"
                            >
                              GÖNDER
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowReviewForm(false)}
                              className="px-4 py-2 border border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider hover:text-white cursor-pointer"
                            >
                              İPTAL
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white bg-zinc-800/80 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={currentImageSrc}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
