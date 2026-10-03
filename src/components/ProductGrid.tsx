import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onOpenDetail: (p: Product) => void;
  title?: string;
  categoryFilter?: string;
  onFilterChange?: (cat: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onOpenDetail,
  title = 'BEST SELLERS',
  categoryFilter = 'all',
  onFilterChange
}) => {
  const [selectedSort, setSelectedSort] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (categoryFilter !== 'all') {
      if (categoryFilter === 'new-arrivals') {
        list = list.filter((p) => p.isNew);
      } else if (categoryFilter === 'women') {
        list = list.filter((p) => p.gender === 'women' || p.gender === 'unisex');
        // if no explicit women's items, show unisex / tech items
        if (list.length === 0) {
          list = products.filter((p) => p.category === 'sportswear' || p.category === 'underwear');
        }
      } else {
        list = list.filter((p) => p.category === categoryFilter);
      }
    }

    // Size filter
    if (selectedSizeFilter !== 'all') {
      list = list.filter((p) => p.sizes.includes(selectedSizeFilter as any));
    }

    // Sort
    if (selectedSort === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (selectedSort === 'price-asc') {
      list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    } else if (selectedSort === 'price-desc') {
      list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    }

    return list;
  }, [products, categoryFilter, selectedSizeFilter, selectedSort]);

  return (
    <section id="products-catalog" className="w-full bg-[#0c0c0d] py-14 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold mb-1">
              <span>EXPLORE ARCHIVE</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="font-mono text-zinc-400">{filteredAndSortedProducts.length} ÜRÜN</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              {title}
            </h2>
          </div>

          {/* Interactive Filters / Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Segmented Control */}
            {onFilterChange && (
              <div className="flex items-center gap-1 p-1 bg-[#161618] border border-zinc-800">
                <button
                  onClick={() => onFilterChange('all')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    categoryFilter === 'all'
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  ALL
                </button>
                <button
                  onClick={() => onFilterChange('underwear')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    categoryFilter === 'underwear'
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  UNDERWEAR
                </button>
                <button
                  onClick={() => onFilterChange('sportswear')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    categoryFilter === 'sportswear'
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  SPORTSWEAR
                </button>
              </div>
            )}

            {/* Size Filter Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedSizeFilter}
                onChange={(e) => setSelectedSizeFilter(e.target.value)}
                className="bg-[#161618] text-xs font-medium text-zinc-300 border border-zinc-800 py-2 pl-3 pr-8 focus:outline-none focus:border-white uppercase cursor-pointer"
              >
                <option value="all">Beden: Tümü</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as any)}
                className="bg-[#161618] text-xs font-medium text-zinc-300 border border-zinc-800 py-2 pl-3 pr-8 focus:outline-none focus:border-white uppercase cursor-pointer"
              >
                <option value="featured">Sıralama: Öne Çıkanlar</option>
                <option value="newest">En Yeniler</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid: 4 cols Desktop, 3 Tablet, 2 Mobile */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="py-20 text-center text-zinc-500">
            <p className="text-base font-medium">Seçili filtrelere uygun ürün bulunamadı.</p>
            <button
              onClick={() => {
                setSelectedSizeFilter('all');
                if (onFilterChange) onFilterChange('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white border border-zinc-700 hover:bg-white hover:text-black transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8">
            {filteredAndSortedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} onOpenDetail={onOpenDetail} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
