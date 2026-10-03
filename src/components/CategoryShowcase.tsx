import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryShowcaseProps {
  onSelectCategory: (category: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  return (
    <section className="w-full bg-[#0c0c0d] py-16 sm:py-24 border-b border-zinc-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-zinc-800">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold">
              COLLECTIONS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase mt-1">
              ENGINEERED APPAREL
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md mt-2 sm:mt-0">
            Avusturya MicroModal® lifleri ve dikişsiz kompresyon teknolojisi ile her harekette üstün konfor.
          </p>
        </div>

        {/* Editorial Grid: 2 Primary Big Cards + 1 Wide Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* UNDERWEAR Card (7 cols) */}
          <div
            onClick={() => onSelectCategory('underwear')}
            className="group relative lg:col-span-7 h-[480px] sm:h-[560px] bg-zinc-950 overflow-hidden cursor-pointer"
          >
            <img
              src="/src/assets/images/cat_underwear_pack_1791051494979.jpg"
              alt="Boefje Luxury Underwear Collection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
                01 / SIGNATURE ESSENTIALS
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mt-2 mb-2">
                UNDERWEAR
              </h3>
              <p className="text-sm text-zinc-300 mb-6 max-w-sm">
                Essential comfort. Everyday confidence. Austrian micro-modal & Aegean organic cotton.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:translate-x-1.5 transition-transform duration-200">
                <span>SHOP UNDERWEAR</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* SPORTSWEAR Card (5 cols) */}
          <div
            onClick={() => onSelectCategory('sportswear')}
            className="group relative lg:col-span-5 h-[480px] sm:h-[560px] bg-zinc-950 overflow-hidden cursor-pointer"
          >
            <img
              src="/src/assets/images/cat_sportswear_model_1791051503755.jpg"
              alt="Boefje Performance Sportswear"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
                02 / HIGH PERFORMANCE
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mt-2 mb-2">
                SPORTSWEAR
              </h3>
              <p className="text-sm text-zinc-300 mb-6 max-w-xs">
                Built to move. Seamless compression, breathable training layers & sweatpants.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:translate-x-1.5 transition-transform duration-200">
                <span>SHOP SPORTSWEAR</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
