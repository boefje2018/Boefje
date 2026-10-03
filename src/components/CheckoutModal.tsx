import React, { useState } from 'react';
import { X, ShieldCheck, Lock, CreditCard, CheckCircle, Truck, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

interface CheckoutModalProps {
  onClose: () => void;
  onViewOrderInAccount: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onViewOrderInAccount }) => {
  const { cart, cartSubtotal, cartDiscount, cartShipping, cartTotal, createOrder } = useStore();

  const [step, setStep] = useState<'details' | 'processing' | 'confirmed'>('details');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form Fields
  const [firstName, setFirstName] = useState('Kaan');
  const [lastName, setLastName] = useState('Yılmaz');
  const [email, setEmail] = useState('kaan.yilmaz@example.com');
  const [phone, setPhone] = useState('0532 555 12 34');
  const [address, setAddress] = useState('Abdi İpekçi Caddesi No: 42 D: 6');
  const [city, setCity] = useState('İstanbul');
  const [district, setDistrict] = useState('Şişli / Nişantaşı');
  const [postalCode, setPostalCode] = useState('34367');
  const [paymentMethod, setPaymentMethod] = useState<'paytr' | 'bank_transfer'>('paytr');

  // Card details
  const [cardNumber, setCardNumber] = useState('4543 •••• •••• 9812');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('432');
  const [use3DSecure, setUse3DSecure] = useState(true);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const order = createOrder(
        {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          district,
          postalCode
        },
        paymentMethod
      );
      setCreatedOrder(order);
      setStep('confirmed');
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0c0c0d] border border-zinc-800 text-white shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-[#141416] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-bold tracking-widest uppercase">
              BOEFJE
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs uppercase font-mono tracking-wider text-zinc-300">
              GÜVENLİ CHECKOUT
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {step === 'processing' && (
            <div className="py-24 text-center space-y-4">
              <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                PAYTR 3D SECURE DOĞRULANIYOR...
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Banka güvenli ödeme protokolü ve 256-bit SSL şifreleme üzerinden siparişiniz onaylanıyor. Lütfen sayfayı kapatmayınız.
              </p>
            </div>
          )}

          {step === 'confirmed' && createdOrder && (
            <div className="py-8 space-y-6 text-center max-w-xl mx-auto animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={36} />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  SİPARİŞİNİZ ONAYLANDI
                </span>
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-white mt-1">
                  TEŞEKKÜRLER, {createdOrder.customerDetails.firstName}!
                </h3>
                <p className="text-xs text-zinc-400 mt-2">
                  Sipariş detayları ve e-faturanız <strong className="text-white">{createdOrder.customerDetails.email}</strong> adresine gönderildi.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="p-5 bg-[#141416] border border-zinc-800 text-left font-mono text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Sipariş Numarası:</span>
                  <strong className="text-white text-sm">{createdOrder.orderNumber}</strong>
                </div>

                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Kargo Takip Kodu:</span>
                  <span className="text-emerald-400">{createdOrder.trackingNumber} ({createdOrder.carrier})</span>
                </div>

                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Durum:</span>
                  <span className="text-white bg-zinc-800 px-2 py-0.5">Sipariş Alındı (Hazırlanıyor)</span>
                </div>

                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Teslimat Adresi:</span>
                  <span className="text-zinc-200 text-right max-w-xs">
                    {createdOrder.customerDetails.address}, {createdOrder.customerDetails.district} / {createdOrder.customerDetails.city}
                  </span>
                </div>

                <div className="flex justify-between pt-1 text-sm font-bold text-white">
                  <span>Ödenen Tutar:</span>
                  <span>₺{createdOrder.total.toLocaleString('tr-TR')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onViewOrderInAccount();
                  }}
                  className="flex-1 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  SİPARİŞİMİ HESABIMDA GÖRÜNTÜLE
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 border border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-widest hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  ALIŞVERİŞE DEVAM ET
                </button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleSubmitOrder}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form fields (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Delivery Address */}
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                      <Truck size={16} />
                      <span>1. TESLİMAT BİLGİLERİ</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                          Ad *
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                          Soyad *
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                        Açık Adres (Cadde, Mahalle, Sokak, No, Daire) *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                          İl *
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                        >
                          <option value="İstanbul">İstanbul</option>
                          <option value="Ankara">Ankara</option>
                          <option value="İzmir">İzmir</option>
                          <option value="Bursa">Bursa</option>
                          <option value="Antalya">Antalya</option>
                          <option value="Adana">Adana</option>
                          <option value="Eskişehir">Eskişehir</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                          İlçe *
                        </label>
                        <input
                          type="text"
                          required
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                          Posta Kodu *
                        </label>
                        <input
                          type="text"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full bg-[#161618] border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                      <CreditCard size={16} />
                      <span>2. ÖDEME YÖNTEMİ (PayTR Entegrasyonlu)</span>
                    </h3>

                    {/* Method Tabs */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paytr')}
                        className={`p-3 border text-left flex items-center justify-between transition-all ${
                          paymentMethod === 'paytr'
                            ? 'border-white bg-[#161618] text-white'
                            : 'border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <span className="text-xs font-bold uppercase">PayTR / Kredi Kartı</span>
                        <Lock size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bank_transfer')}
                        className={`p-3 border text-left flex items-center justify-between transition-all ${
                          paymentMethod === 'bank_transfer'
                            ? 'border-white bg-[#161618] text-white'
                            : 'border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <span className="text-xs font-bold uppercase">Havale / EFT</span>
                        <span className="text-[10px] text-zinc-500 font-mono">%5 İndirimli</span>
                      </button>
                    </div>

                    {paymentMethod === 'paytr' ? (
                      <div className="p-4 bg-[#141416] border border-zinc-800 space-y-3">
                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                            Kart Numarası
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4543 0000 0000 0000"
                            className="w-full bg-[#1c1c20] border border-zinc-700 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                              Son Kullanma Tarihi
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="AA/YY"
                              className="w-full bg-[#1c1c20] border border-zinc-700 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                              CVV / Güvenlik Kodu
                            </label>
                            <input
                              type="text"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123"
                              maxLength={4}
                              className="w-full bg-[#1c1c20] border border-zinc-700 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                            />
                          </div>
                        </div>

                        <label className="flex items-center gap-2 pt-2 text-xs text-zinc-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={use3DSecure}
                            onChange={(e) => setUse3DSecure(e.target.checked)}
                            className="rounded-xs border-zinc-700"
                          />
                          <span>3D Secure ile SMS doğrulama kullanarak güvenle öde</span>
                        </label>
                      </div>
                    ) : (
                      <div className="p-4 bg-[#141416] border border-zinc-800 text-xs font-mono text-zinc-300 space-y-2">
                        <p className="font-bold text-white uppercase">Boefje Tekstil Tic. A.Ş.</p>
                        <p>Garanti BBVA IBAN: TR84 0006 2000 1234 5678 9012 34</p>
                        <p className="text-[11px] text-zinc-500">
                          Açıklama alanına sipariş numaranızı yazınız. Siparişiniz havale kontrolü sonrası onaylanacaktır.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Summary (5 cols) */}
                <div className="lg:col-span-5 bg-[#141416] border border-zinc-800 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-zinc-800">
                      SİPARİŞ ÖZETİ ({cart.length} Ürün)
                    </h3>

                    {/* Mini item list */}
                    <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-zinc-800/80 pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product.images.main}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-12 object-cover bg-zinc-900 border border-zinc-800"
                            />
                            <div>
                              <p className="font-medium text-white line-clamp-1">{item.product.name}</p>
                              <p className="text-[11px] text-zinc-500 font-mono">
                                {item.selectedSize} · {item.selectedColor.label} × {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-white tabular-nums">
                            ₺{((item.product.salePrice ?? item.product.price) * item.quantity).toLocaleString('tr-TR')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown */}
                    <div className="mt-6 pt-4 border-t border-zinc-800 space-y-2 text-xs font-mono text-zinc-400">
                      <div className="flex justify-between">
                        <span>Ara Toplam</span>
                        <span className="text-white">₺{cartSubtotal.toLocaleString('tr-TR')}</span>
                      </div>
                      {cartDiscount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Kupon İndirimi</span>
                          <span>-₺{cartDiscount.toLocaleString('tr-TR')}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Kargo</span>
                        <span className="text-white">
                          {cartShipping === 0 ? 'ÜCRETSİZ' : `₺${cartShipping}`}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-zinc-700 text-base font-bold text-white">
                        <span className="font-sans uppercase">TOPLAM</span>
                        <span>₺{cartTotal.toLocaleString('tr-TR')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800 space-y-3">
                    <button
                      type="submit"
                      className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer shadow-xl flex items-center justify-center gap-2"
                    >
                      <Lock size={14} />
                      <span>SİPARİŞİ TAMAMLA (₺{cartTotal.toLocaleString('tr-TR')})</span>
                    </button>

                    <div className="flex items-center justify-center gap-3 text-[10px] text-zinc-500 font-mono uppercase">
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={12} /> BDDK & PayTR Lisanslı
                      </span>
                      <span>·</span>
                      <span>256-Bit SSL</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
