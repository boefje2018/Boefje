import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onShopUnderwear: () => void;
  onShopSportswear: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopUnderwear, onShopSportswear }) => {
  return (
    <section className="relative w-full h-[90vh] min-h-[640px] max-h-[960px] bg-black overflow-hidden flex items-end">
      {/* Background Image Container with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_male_editorial_1791051483046.jpg"
          alt="Boefje Underwear Campaign Editorial"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Anti-glare gradient scrim for WCAG AA typography readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-20">
        <div className="max-w-2xl">
          {/* Subtle Brand Kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-zinc-300 mb-3">
            <span>BOEFJE</span>
            <span aria-hidden="true" className="text-zinc-500">·</span>
            <span>AMSTERDAM</span>
          </div>

          {/* Main Campaign Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95] text-balance mb-6">
            UNDERWEAR
            <br />
            <span className="font-light tracking-wide text-zinc-300 text-3xl sm:text-5xl lg:text-6xl">
              DESIGNED FOR EVERY MOVE.
            </span>
          </h1>

          {/* Minimal Luxury CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onShopUnderwear}
              className="px-7 py-3.5 text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-all duration-200 shadow-xl cursor-pointer"
            >
              SHOP UNDERWEAR
            </button>
            <button
              onClick={onShopSportswear}
              className="px-7 py-3.5 text-xs font-bold uppercase tracking-widest bg-transparent text-white border border-white/60 hover:bg-white/10 hover:border-white transition-all duration-200 cursor-pointer backdrop-blur-xs"
            >
              SHOP SPORTSWEAR
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-6 sm:right-12 hidden md:flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-zinc-400">
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
};
