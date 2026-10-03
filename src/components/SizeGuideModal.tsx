import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ onClose }) => {
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');

  const measurements = [
    {
      size: 'XS',
      waistCm: '71 - 76',
      waistInch: '28 - 30',
      hipsCm: '86 - 91',
      hipsInch: '34 - 36',
      thighCm: '50 - 53',
      thighInch: '19.5 - 21'
    },
    {
      size: 'S',
      waistCm: '76 - 81',
      waistInch: '30 - 32',
      hipsCm: '91 - 96',
      hipsInch: '36 - 38',
      thighCm: '53 - 56',
      thighInch: '21 - 22'
    },
    {
      size: 'M',
      waistCm: '81 - 86',
      waistInch: '32 - 34',
      hipsCm: '96 - 101',
      hipsInch: '38 - 40',
      thighCm: '56 - 59',
      thighInch: '22 - 23.5'
    },
    {
      size: 'L',
      waistCm: '86 - 92',
      waistInch: '34 - 36',
      hipsCm: '101 - 107',
      hipsInch: '40 - 42',
      thighCm: '59 - 63',
      thighInch: '23.5 - 25'
    },
    {
      size: 'XL',
      waistCm: '92 - 99',
      waistInch: '36 - 39',
      hipsCm: '107 - 114',
      hipsInch: '42 - 45',
      thighCm: '63 - 67',
      thighInch: '25 - 26.5'
    },
    {
      size: 'XXL',
      waistCm: '99 - 107',
      waistInch: '39 - 42',
      hipsCm: '114 - 122',
      hipsInch: '45 - 48',
      thighCm: '67 - 72',
      thighInch: '26.5 - 28.5'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0c0c0d] border border-zinc-800 p-6 sm:p-8 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Ruler size={18} className="text-zinc-300" />
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
              BEDEN ÖLÇÜ REHBERİ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Unit switch */}
        <div className="flex items-center justify-between mt-4 mb-4">
          <p className="text-xs text-zinc-400">
            Ölçümler vücut hatlarına tam temas edecek şekilde mezura ile alınmalıdır.
          </p>

          <div className="flex items-center border border-zinc-800 bg-[#161618] p-0.5">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-mono font-medium transition-colors ${
                unit === 'cm' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('inch')}
              className={`px-3 py-1 text-xs font-mono font-medium transition-colors ${
                unit === 'inch' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              INCH
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-zinc-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#141416] text-zinc-400 uppercase font-mono tracking-wider border-b border-zinc-800">
                <th className="py-3 px-4">Beden</th>
                <th className="py-3 px-4">Bel ({unit.toUpperCase()})</th>
                <th className="py-3 px-4">Basen ({unit.toUpperCase()})</th>
                <th className="py-3 px-4">Uyluk ({unit.toUpperCase()})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 font-mono">
              {measurements.map((row) => (
                <tr key={row.size} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{row.size}</td>
                  <td className="py-3 px-4 text-zinc-300">
                    {unit === 'cm' ? row.waistCm : row.waistInch}
                  </td>
                  <td className="py-3 px-4 text-zinc-300">
                    {unit === 'cm' ? row.hipsCm : row.hipsInch}
                  </td>
                  <td className="py-3 px-4 text-zinc-300">
                    {unit === 'cm' ? row.thighCm : row.thighInch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tips */}
        <div className="mt-4 p-3 bg-[#141416] border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
          <p className="font-semibold text-zinc-200">İki Beden Arasında Kaldıysanız:</p>
          <p>
            Vücudu sıkı saran ve toplanmayan atletik bir kavrayış istiyorsanız küçük bedeni, günlük ev konforunda gevşek bir his istiyorsanız bir büyük bedeni seçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};
