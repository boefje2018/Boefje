import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="brand-story" className="w-full bg-[#0c0c0d] py-20 sm:py-28 border-y border-zinc-900 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden border border-zinc-800">
              <img
                src="/src/assets/images/story_amsterdam_atelier_1791051513856.jpg"
                alt="Boefje Design Atelier & Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono uppercase text-zinc-300">
                <span>BOEFJE ATELIER / AMSTERDAM</span>
                <span>EST. 2024</span>
              </div>
            </div>
          </div>

          {/* Editorial Text (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-zinc-400">
              <Sparkles size={14} />
              <span>THE PHILOSOPHY</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-[1.05]">
              AMSTERDAM ROOTS.
              <br />
              <span className="text-zinc-400 font-light">AEGEAN MASTERY.</span>
            </h2>

            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
              <p>
                Boefje, Hollanda minimalizminin fonksiyonel estetiğini, dünyanın en kaliteli uzun elyaflı Ege organik pamuğu ve Avusturya MicroModal® lifleriyle bir araya getiren bağımsız bir erkek lüks iç giyim ve spor markasıdır.
              </p>
              <p className="text-zinc-400">
                Geleneksel erkek iç giyiminin sıkan, toplanan ve terleten kusurlarını; anatomik 3D U-Pouch mimarisi ve lazer dikişsiz birleşimlerle ortadan kaldırdık.
              </p>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800 font-mono text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase">MATERYAL</span>
                <p className="text-white font-medium mt-0.5">Avusturya Lenzing Modal®</p>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase">ERGONOMİ</span>
                <p className="text-white font-medium mt-0.5">3D Dual-Pouch Destek</p>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase">İŞÇİLİK</span>
                <p className="text-white font-medium mt-0.5">Sıfır Sürtünme Lazer Kesim</p>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase">VİZYON</span>
                <p className="text-white font-medium mt-0.5">Her Harekette Kusursuz</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
