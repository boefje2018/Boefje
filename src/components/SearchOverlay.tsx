import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface SearchOverlayProps {
  onSelectProduct: (product: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onSelectProduct }) => {
  const { products, isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('boefje_recent_searches');
    return saved ? JSON.parse(saved) : ['MicroModal', 'Seamless Trunk', '3-Pack', 'Sportswear'];
  });

  const trendingQueries = ['MicroModal Air', 'Aegean Cotton', 'Aeromesh 2-in-1', 'Long Boxer', 'Compression'];

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchSubtitle = p.subtitle.toLowerCase().includes(q);
      const matchColor = p.colors.some((c) => c.name.toLowerCase().includes(q) || c.label.toLowerCase().includes(q));
      return matchName || matchCategory || matchSku || matchSubtitle || matchColor;
    });
  }, [products, query]);

  if (!isSearchOpen) return null;

  const handleExecuteSearch = (term: string) => {
    setQuery(term);
    if (!recentSearches.includes(term)) {
      const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem('boefje_recent_searches', JSON.stringify(updated));
    }
  };

  const handleProductClick = (product: Product) => {
    handleExecuteSearch(product.name);
    setIsSearchOpen(false);
    onSelectProduct(product);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0c0d]/95 backdrop-blur-md overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Header / Input */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <div className="flex-1 flex items-center gap-3">
            <Search size={24} className="text-zinc-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün adı, kategori, renk veya SKU arayın..."
              className="w-full bg-transparent text-xl sm:text-2xl font-light text-white placeholder-zinc-600 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        {query.trim().length === 0 ? (
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Searches */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  RECENT SEARCHES
                </span>
                {recentSearches.length > 0 && (
                  <button
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem('boefje_recent_searches');
                    }}
                    className="text-[11px] text-zinc-500 hover:text-zinc-300 underline"
                  >
                    Temizle
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleExecuteSearch(term)}
                    className="px-3.5 py-1.5 text-xs text-zinc-300 bg-[#161618] border border-zinc-800 hover:border-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Queries */}
            <div>
              <span className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
                TRENDING NOW
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingQueries.map((trend) => (
                  <button
                    key={trend}
                    onClick={() => handleExecuteSearch(trend)}
                    className="px-3.5 py-1.5 text-xs text-zinc-300 bg-[#161618] border border-zinc-800 hover:border-zinc-500 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Tag size={12} className="text-zinc-500" />
                    <span>{trend}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="py-8">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-800/80">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                PRODUCT RESULTS ({searchResults.length})
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                "{query}" için sonuçlar
              </span>
            </div>

            {searchResults.length === 0 ? (
              <div className="py-16 text-center text-zinc-500">
                <p className="text-base font-medium">"{query}" ile eşleşen bir ürün bulunamadı.</p>
                <p className="text-xs text-zinc-600 mt-2">
                  Lütfen farklı bir anahtar kelime veya model adı deneyiniz.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="group p-3 bg-[#141416] border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer flex gap-3"
                  >
                    <img
                      src={product.images.main}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-500">
                          {product.category} · {product.sku}
                        </span>
                        <h4 className="text-xs font-semibold text-white group-hover:text-zinc-200 line-clamp-1">
                          {product.name}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-800/60">
                        <span className="font-mono text-xs font-bold text-white tabular-nums">
                          ₺{(product.salePrice ?? product.price).toLocaleString('tr-TR')}
                        </span>
                        <span className="text-[11px] text-zinc-400 group-hover:text-white flex items-center gap-1 font-semibold uppercase">
                          <span>İNCELE</span>
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
