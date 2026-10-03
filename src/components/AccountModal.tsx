import React, { useState } from 'react';
import { X, Package, Heart, MapPin, User, Lock, LogOut, CheckCircle, Clock, Truck, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';

interface AccountModalProps {
  onClose: () => void;
  onOpenWishlist: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ onClose, onOpenWishlist }) => {
  const { orders } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'security'>('orders');

  const [userName, setUserName] = useState('Kaan Yılmaz');
  const [userEmail, setUserEmail] = useState('kaan.yilmaz@example.com');
  const [userPhone, setUserPhone] = useState('0532 555 12 34');

  const statusSteps: OrderStatus[] = [
    'Order Received',
    'Payment Confirmed',
    'Preparing',
    'Shipped',
    'Delivered'
  ];

  const getStepIndex = (status: OrderStatus) => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0c0c0d] border border-zinc-800 text-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#141416] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-bold tracking-widest uppercase">
              MY ACCOUNT
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs text-zinc-400 font-mono">{userEmail}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Layout: Sidebar Tabs + Content */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12">
          {/* Sidebar Tabs */}
          <div className="md:col-span-4 bg-[#111113] p-6 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col justify-between">
            <div className="space-y-1.5">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full px-4 py-3 text-xs font-bold uppercase tracking-wider text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  activeTab === 'orders'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                <Package size={16} />
                <span>SİPARİŞLERİM ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full px-4 py-3 text-xs font-bold uppercase tracking-wider text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                <User size={16} />
                <span>PROFİL BİLGİLERİ</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full px-4 py-3 text-xs font-bold uppercase tracking-wider text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  activeTab === 'addresses'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                <MapPin size={16} />
                <span>TESLİMAT ADRESLERİ</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`w-full px-4 py-3 text-xs font-bold uppercase tracking-wider text-left flex items-center gap-3 transition-colors cursor-pointer ${
                  activeTab === 'security'
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                <Lock size={16} />
                <span>ŞİFRE & GÜVENLİK</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenWishlist();
                }}
                className="w-full px-4 py-3 text-xs font-bold uppercase tracking-wider text-left flex items-center gap-3 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <Heart size={16} />
                <span>FAVORİ LİSTEM</span>
              </button>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <button
                onClick={onClose}
                className="w-full px-4 py-2.5 text-xs font-mono uppercase text-zinc-500 hover:text-red-400 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut size={14} />
                <span>Oturumu Kapat</span>
              </button>
            </div>
          </div>

          {/* Main Tab Panel */}
          <div className="md:col-span-8 p-6 sm:p-8">
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                    SİPARİŞ GEÇMİŞİ & KARGO TAKİBİ
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Tüm geçmiş ve aktif siparişlerinizin durumunu anlık takip edin.
                  </p>
                </div>

                {orders.length === 0 ? (
                  <div className="py-16 text-center text-zinc-500">
                    <p className="text-sm">Henüz kayıtlı bir siparişiniz bulunmuyor.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((ord) => {
                      const currentIdx = getStepIndex(ord.status);

                      return (
                        <div
                          key={ord.id}
                          className="bg-[#141416] border border-zinc-800 p-5 space-y-4 font-mono text-xs"
                        >
                          {/* Order Header */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                            <div>
                              <span className="text-[11px] text-zinc-500 uppercase">Sipariş No</span>
                              <p className="font-bold text-white text-sm">{ord.orderNumber}</p>
                            </div>
                            <div>
                              <span className="text-[11px] text-zinc-500 uppercase">Tarih</span>
                              <p className="text-zinc-300">{ord.date}</p>
                            </div>
                            <div>
                              <span className="text-[11px] text-zinc-500 uppercase">Toplam Tutar</span>
                              <p className="font-bold text-white text-sm">₺{ord.total.toLocaleString('tr-TR')}</p>
                            </div>
                            <div>
                              <span className="text-[11px] text-zinc-500 uppercase">Durum</span>
                              <span className="inline-block mt-0.5 px-2 py-0.5 bg-zinc-800 text-white font-sans text-[11px] font-bold uppercase">
                                {ord.status}
                              </span>
                            </div>
                          </div>

                          {/* Tracking Info */}
                          {ord.trackingNumber && (
                            <div className="p-3 bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <Truck size={16} className="text-emerald-400" />
                                <span>
                                  {ord.carrier}: <strong className="text-white">{ord.trackingNumber}</strong>
                                </span>
                              </div>
                              <span className="text-emerald-400 text-[11px]">Canlı Takip Aktif</span>
                            </div>
                          )}

                          {/* Timeline Step Bar */}
                          <div className="pt-2">
                            <div className="grid grid-cols-5 gap-1 text-center text-[10px] text-zinc-400 font-sans">
                              {statusSteps.map((stepName, sIdx) => {
                                const isPassed = sIdx <= currentIdx;
                                return (
                                  <div key={stepName} className="flex flex-col items-center">
                                    <div
                                      className={`w-5 h-5 rounded-full flex items-center justify-center mb-1 text-[9px] font-bold ${
                                        isPassed
                                          ? 'bg-white text-black'
                                          : 'bg-zinc-800 text-zinc-500'
                                      }`}
                                    >
                                      {isPassed ? '✓' : sIdx + 1}
                                    </div>
                                    <span className={isPassed ? 'text-white font-medium' : 'text-zinc-600'}>
                                      {stepName}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Item Previews */}
                          <div className="pt-2 border-t border-zinc-800 space-y-2">
                            {ord.items.map((it) => (
                              <div key={it.id} className="flex items-center justify-between text-xs">
                                <span className="text-zinc-300">
                                  {it.product.name} ({it.selectedSize}, {it.selectedColor.label}) × {it.quantity}
                                </span>
                                <span className="text-white">
                                  ₺{((it.product.salePrice ?? it.product.price) * it.quantity).toLocaleString('tr-TR')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                    PROFİL VE KİŞİSEL BİLGİLER
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Adınız ve iletişim bilgilerinizi güncelleyin.
                  </p>
                </div>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      E-Posta
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <button
                    onClick={() => alert('Profil bilgileriniz güncellendi.')}
                    className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                  >
                    GÜNCELLE
                  </button>
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                    KAYITLI TESLİMAT ADRESLERİ
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Hızlı teslimat için varsayılan kargo adresi.
                  </p>
                </div>

                <div className="p-4 bg-[#141416] border border-zinc-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white uppercase">Ev / Ofis Adresi (Varsayılan)</span>
                    <span className="text-[10px] font-mono text-emerald-400">Aktif</span>
                  </div>
                  <p className="text-zinc-300">Kaan Yılmaz · 0532 555 12 34</p>
                  <p className="text-zinc-400">Abdi İpekçi Caddesi No: 42 D: 6</p>
                  <p className="text-zinc-400">Şişli / Nişantaşı, İstanbul 34367</p>
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                    GÜVENLİK AYARLARI
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Hesap şifrenizi güncelleyin ve iki adımlı doğrulamayı yönetin.
                  </p>
                </div>

                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Mevcut Şifre
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Yeni Şifre
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <button
                    onClick={() => alert('Şifreniz başarıyla değiştirildi.')}
                    className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
                  >
                    ŞİFREYİ DEĞİŞTİR
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
