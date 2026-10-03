import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Check, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenSizeGuide }) => {
  const { showToast, setIsAdminOpen } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    showToast('Boefje topluluğuna katıldınız. Hoş geldiniz!');
    setNewsletterEmail('');
  };

  return (
    <footer className="w-full bg-[#080809] border-t border-zinc-900 text-zinc-400 text-xs">
      {/* Top Newsletter & Brand Statement */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Brand Philosophy */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-[0.22em] text-white">
              BOEFJE
            </span>
            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              Designed in Amsterdam. Woven with Aegean combed organic cotton and Austrian MicroModal®. Minimalist luxury underwear and high-performance sportswear engineered for every move.
            </p>
            <div className="pt-2 flex items-center gap-4 text-[11px] font-mono text-zinc-500 uppercase">
              <span className="flex items-center gap-1.5">
                <Globe size={13} /> boefje.com.tr
              </span>
              <span>·</span>
              <span>boefje.tr</span>
              <span>·</span>
              <span>Amsterdam BV</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 block">
              JOIN THE BOEFJE COMMUNITY
            </span>
            <p className="text-xs text-zinc-400">
              Yeni koleksiyon lansmanları, özel editorial yayınlar ve VIP üyelik ayrıcalıkları için bültenimize kaydolun.
            </p>

            {subscribed ? (
              <div className="p-3 bg-zinc-900 border border-zinc-700 text-emerald-400 text-xs flex items-center gap-2 font-mono">
                <Check size={16} />
                <span>Hoş geldiniz. İlk siparişinizde WELCOME10 kodunu kullanabilirsiniz.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="E-POSTA ADRESİNİZ"
                  className="flex-1 bg-[#141416] border border-zinc-800 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer shrink-0"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Columns */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Shop */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('underwear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Underwear & Boxer Briefs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('sportswear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sportswear & Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('new-arrivals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('underwear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Signature 3-Packs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Help */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              HELP & SUPPORT
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Beden Ölçü Tablosu
                </button>
              </li>
              <li>
                <a href="#brand-story" className="hover:text-white transition-colors">
                  Kargo ve Teslimat Süreleri
                </a>
              </li>
              <li>
                <a href="#brand-story" className="hover:text-white transition-colors">
                  30 Gün Değişim & İade
                </a>
              </li>
              <li>
                <span className="text-zinc-500 font-mono">Destek: hello@boefje.com.tr</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#brand-story" className="hover:text-white transition-colors">
                  Marka Hikayesi (Amsterdam Atelier)
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-white transition-colors">
                  The Boefje Journal
                </a>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Gizlilik Politikası (KVKK)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Kullanım Şartları
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social & Security */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              FOLLOW US
            </h4>
            <div className="space-y-2 text-xs font-mono uppercase">
              <p>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram: @boefje_underwear
                </a>
              </p>
              <p>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TikTok: @boefjeofficial
                </a>
              </p>
              <p>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YouTube: Boefje Studio
                </a>
              </p>
            </div>

            <div className="pt-3 flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
              <ShieldCheck size={14} className="text-zinc-400" />
              <span>256-Bit SSL · PayTR Güvenli Ödeme Altyapısı</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
        <div>
          © {new Date().getFullYear()} BOEFJE UNDERWEAR & SPORTSWEAR. TÜM HAKLARI SAKLIDIR.
        </div>
        <div className="flex items-center gap-6">
          <span>TÜRKİYE (TRY ₺)</span>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            Yönetim Paneli
          </button>
        </div>
      </div>
    </footer>
  );
};
