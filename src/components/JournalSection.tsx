import React from 'react';
import { ArrowRight, Clock, BookOpen, X } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/products';
import { JournalArticle } from '../types';
import { useStore } from '../context/StoreContext';

export const JournalSection: React.FC = () => {
  const { selectedArticle, setSelectedArticle } = useStore();

  return (
    <section id="journal" className="w-full bg-[#0c0c0d] py-16 sm:py-24 border-b border-zinc-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-zinc-800 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold mb-1">
              <BookOpen size={14} />
              <span>EDITORIAL ARCHIVE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              THE BOEFJE JOURNAL
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm mt-2 sm:mt-0">
            Erkek stili, lif bilimi, anatomik uyum ve modern spor performansı üzerine makaleler.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((art) => (
            <article
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group cursor-pointer flex flex-col justify-between border border-zinc-900 bg-[#111113] hover:border-zinc-700 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-3 left-3 bg-black/80 px-2 py-0.5 text-[10px] font-mono uppercase text-zinc-300">
                  {art.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500 mb-2">
                    <span>{art.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white uppercase group-hover:text-zinc-200 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                  <span>MAKALESİNİ OKU</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0c0c0d] border border-zinc-800 text-white shadow-2xl p-6 sm:p-10 my-auto max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800"
            >
              <X size={20} />
            </button>

            <span className="text-[11px] font-mono uppercase text-zinc-400">
              {selectedArticle.category} · {selectedArticle.date} · {selectedArticle.readTime}
            </span>

            <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-2 mb-6">
              {selectedArticle.title}
            </h1>

            <div className="relative aspect-[16/9] mb-8 overflow-hidden border border-zinc-800">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-400 font-mono">
              <span>BOEFJE JOURNAL EDITORIAL TEAM</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200"
              >
                KAPAT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
