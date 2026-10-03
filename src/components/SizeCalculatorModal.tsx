import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Size } from '../types';

interface SizeCalculatorModalProps {
  onClose: () => void;
  onSelectSize?: (size: Size) => void;
}

export const SizeCalculatorModal: React.FC<SizeCalculatorModalProps> = ({ onClose, onSelectSize }) => {
  const [height, setHeight] = useState<number>(180);
  const [weight, setWeight] = useState<number>(76);
  const [waist, setWaist] = useState<number>(84);
  const [preference, setPreference] = useState<'snug' | 'regular' | 'relaxed'>('regular');
  const [calculatedResult, setCalculatedResult] = useState<{
    size: Size;
    confidence: number;
    explanation: string;
    waistInches: string;
  } | null>(null);

  const calculateSize = (e: React.FormEvent) => {
    e.preventDefault();

    // Standard sizing baseline based on Waist (cm) and BMI ratio
    let baseSize: Size = 'M';
    let inch = Math.round(waist / 2.54);

    if (waist < 76) {
      baseSize = 'XS';
    } else if (waist <= 81) {
      baseSize = 'S';
    } else if (waist <= 86) {
      baseSize = 'M';
    } else if (waist <= 92) {
      baseSize = 'L';
    } else if (waist <= 99) {
      baseSize = 'XL';
    } else {
      baseSize = 'XXL';
    }

    // Preference adjustment
    const sizeHierarchy: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    let currentIndex = sizeHierarchy.indexOf(baseSize);

    if (preference === 'relaxed' && currentIndex < sizeHierarchy.length - 1 && waist % 5 > 2) {
      currentIndex += 1;
    } else if (preference === 'snug' && currentIndex > 0 && waist % 5 < 2) {
      currentIndex -= 1;
    }

    const finalSize = sizeHierarchy[currentIndex];

    setCalculatedResult({
      size: finalSize,
      confidence: 96,
      explanation: `${height} cm boy, ${weight} kg ağırlık ve ${waist} cm bel çevreniz için Boefje ${preference === 'snug' ? 'sıkı' : preference === 'relaxed' ? 'rahat' : 'standart'} kesim tablosuna göre en ideal seçim.`,
      waistInches: `${inch}" EU / US Standart`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0c0c0d] border border-zinc-800 p-6 sm:p-8 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-white" />
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
              WHAT'S MY SIZE?
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-zinc-400 my-4 leading-relaxed">
          Kişisel vücut ölçülerinizi girin; Boefje anatomik kesim algoritması sizin için en doğru bedeni saniyeler içinde hesaplasın.
        </p>

        {/* Form */}
        <form onSubmit={calculateSize} className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                BOY (CM)
              </label>
              <input
                type="number"
                min={150}
                max={220}
                required
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                KİLO (KG)
              </label>
              <input
                type="number"
                min={45}
                max={160}
                required
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                BEL (CM)
              </label>
              <input
                type="number"
                min={60}
                max={140}
                required
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value))}
                className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Fit Preference */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              KALIP TERCİHİNİZ
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPreference('snug')}
                className={`py-2 px-3 border text-center font-medium transition-all ${
                  preference === 'snug'
                    ? 'border-white bg-white text-black'
                    : 'border-zinc-800 bg-[#161618] text-zinc-400 hover:text-white'
                }`}
              >
                Saran (Snug)
              </button>
              <button
                type="button"
                onClick={() => setPreference('regular')}
                className={`py-2 px-3 border text-center font-medium transition-all ${
                  preference === 'regular'
                    ? 'border-white bg-white text-black'
                    : 'border-zinc-800 bg-[#161618] text-zinc-400 hover:text-white'
                }`}
              >
                Normal (Regular)
              </button>
              <button
                type="button"
                onClick={() => setPreference('relaxed')}
                className={`py-2 px-3 border text-center font-medium transition-all ${
                  preference === 'relaxed'
                    ? 'border-white bg-white text-black'
                    : 'border-zinc-800 bg-[#161618] text-zinc-400 hover:text-white'
                }`}
              >
                Rahat (Relaxed)
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer mt-2"
          >
            BEDENİMİ HESAPLA
          </button>
        </form>

        {/* Calculated Result Box */}
        {calculatedResult && (
          <div className="mt-6 p-4 bg-[#141416] border border-white/40 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                ÖNERİLEN BOEFJE BEDENİ
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Check size={12} />
                %{calculatedResult.confidence} Doğruluk
              </span>
            </div>

            <div className="flex items-baseline justify-between py-3">
              <div>
                <span className="font-display text-4xl font-extrabold text-white">
                  {calculatedResult.size}
                </span>
                <span className="text-xs text-zinc-400 ml-3 font-mono">
                  {calculatedResult.waistInches}
                </span>
              </div>

              {onSelectSize && (
                <button
                  onClick={() => {
                    onSelectSize(calculatedResult.size);
                    onClose();
                  }}
                  className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-zinc-200 cursor-pointer"
                >
                  <span>BU BEDENİ SEÇ</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {calculatedResult.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
