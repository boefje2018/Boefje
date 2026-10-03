import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

export const InstagramFeed: React.FC = () => {
  const feedItems = [
    {
      id: 1,
      image: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
      tag: '@boefje_underwear',
      caption: 'The MicroModal Air Brief. Engineered for zero distractions.'
    },
    {
      id: 2,
      image: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
      tag: '#BoefjeEssentials',
      caption: 'Austrian beechwood modal stack. Touch the softness.'
    },
    {
      id: 3,
      image: '/src/assets/images/cat_sportswear_model_1791051503755.jpg',
      tag: '#BuiltToMove',
      caption: 'Aeromesh 2-in-1 shorts in studio action.'
    },
    {
      id: 4,
      image: '/src/assets/images/story_amsterdam_atelier_1791051513856.jpg',
      tag: '#AmsterdamRoots',
      caption: 'Fabric grading and ergonomic pattern testing at our studio.'
    }
  ];

  return (
    <section className="w-full bg-[#0c0c0d] py-16 sm:py-20 border-b border-zinc-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-zinc-800 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold mb-1">
              <Instagram size={14} />
              <span>@BOEFJE_UNDERWEAR</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              COMMUNITY & EDITORIAL
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white mt-2 sm:mt-0 transition-colors"
          >
            <span>FOLLOW ON INSTAGRAM</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* 4 Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-zinc-950 overflow-hidden border border-zinc-900 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-xs">
                <span className="font-mono text-[10px] text-zinc-300 uppercase">{item.tag}</span>
                <p className="text-white font-medium line-clamp-2 mt-1">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
