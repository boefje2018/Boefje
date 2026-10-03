import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Boxes,
  TicketPercent,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Truck,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus, Size, Category } from '../types';

interface AdminPanelModalProps {
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ onClose }) => {
  const {
    products,
    orders,
    coupons,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateVariantStock,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'inventory' | 'coupons'>('dashboard');

  // Product Editing state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New product form
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('underwear');
  const [formPrice, setFormPrice] = useState(590);
  const [formSalePrice, setFormSalePrice] = useState<number | undefined>(undefined);
  const [formDescription, setFormDescription] = useState('');
  const [formMaterials, setFormMaterials] = useState('');

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSku.trim()) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        sku: formSku,
        category: formCategory,
        price: formPrice,
        salePrice: formSalePrice || undefined,
        description: formDescription,
        materials: formMaterials
      });
      setEditingProduct(null);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        sku: formSku,
        slug: formName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: formName,
        subtitle: 'Amsterdam Studio Design · Yüksek performans lifi',
        category: formCategory,
        gender: 'men',
        price: formPrice,
        salePrice: formSalePrice || undefined,
        description: formDescription,
        materials: formMaterials || '92% Lenzing MicroModal, 8% Elastan',
        fit: 'Tailored Ergonomic Fit',
        care: '30°C hassas yıkama.',
        features: ['Ergonomik 3D U-Pouch', 'Dikişsiz paça yapısı', 'Nefes alabilir kumaş'],
        inStock: true,
        rating: 5.0,
        reviewCount: 1,
        images: {
          main: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
          front: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
          back: '/src/assets/images/hero_male_editorial_1791051483046.jpg',
          side: '/src/assets/images/cat_underwear_pack_1791051494979.jpg',
          detail: '/src/assets/images/story_amsterdam_atelier_1791051513856.jpg'
        },
        colors: [
          { name: 'Pitch Black', hex: '#111111', label: 'Derin Siyah' },
          { name: 'Chalk White', hex: '#F3F4F6', label: 'Kırık Beyaz' }
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        stockByVariant: {
          'Pitch Black-M': 25,
          'Pitch Black-L': 20
        },
        reviews: []
      };

      addProduct(newProd);
      setIsAddingNew(false);
    }

    setFormName('');
    setFormSku('');
  };

  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormSku(p.sku);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormSalePrice(p.salePrice);
    setFormDescription(p.description);
    setFormMaterials(p.materials);
    setIsAddingNew(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#0c0c0d] border border-zinc-800 text-white shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Admin Header */}
        <div className="px-6 py-4 bg-[#141416] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-bold tracking-widest text-white uppercase">
              BOEFJE CORE
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs font-mono tracking-wider uppercase text-zinc-400">
              YÖNETİM KONSOLU
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40">
              PROD · ONLINE
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Admin Nav Tabs */}
        <div className="px-6 bg-[#111113] border-b border-zinc-800 flex items-center gap-1 sm:gap-2 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('dashboard'); setIsAddingNew(false); }}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => { setActiveTab('products'); setIsAddingNew(false); }}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Package size={14} />
            <span>Ürünler ({products.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('orders'); setIsAddingNew(false); }}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingBag size={14} />
            <span>Siparişler ({orders.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('inventory'); setIsAddingNew(false); }}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Boxes size={14} />
            <span>Stok / Envanter</span>
          </button>

          <button
            onClick={() => { setActiveTab('coupons'); setIsAddingNew(false); }}
            className={`py-3 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'coupons'
                ? 'border-white text-white'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <TicketPercent size={14} />
            <span>Kuponlar ({coupons.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#141416] border border-zinc-800">
                  <span className="text-[11px] font-mono uppercase text-zinc-500">Toplam Gelir</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                    ₺{totalRevenue.toLocaleString('tr-TR')}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
                    <TrendingUp size={12} /> +18.4% Geçen aya göre
                  </span>
                </div>

                <div className="p-4 bg-[#141416] border border-zinc-800">
                  <span className="text-[11px] font-mono uppercase text-zinc-500">Toplam Sipariş</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                    {totalOrders}
                  </p>
                  <span className="text-[10px] text-zinc-400 font-mono mt-1 block">
                    Yurtiçi Kargo Entegre
                  </span>
                </div>

                <div className="p-4 bg-[#141416] border border-zinc-800">
                  <span className="text-[11px] font-mono uppercase text-zinc-500">Ortalama Sepet Tutarı</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                    ₺{avgOrderValue.toLocaleString('tr-TR')}
                  </p>
                  <span className="text-[10px] text-zinc-400 font-mono mt-1 block">
                    3-Pack & Kombin Tercihi
                  </span>
                </div>

                <div className="p-4 bg-[#141416] border border-zinc-800">
                  <span className="text-[11px] font-mono uppercase text-zinc-500">Aktif Ürün Sayısı</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                    {products.length}
                  </p>
                  <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                    Tüm kategoriler yayında
                  </span>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-[#141416] border border-zinc-800 p-5">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                    SON SİPARİŞLER
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-zinc-400 hover:text-white underline font-mono cursor-pointer"
                  >
                    Tümünü Gör →
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {orders.slice(0, 3).map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3 bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <strong className="text-white">{ord.orderNumber}</strong>
                        <span className="text-zinc-500 ml-2">({ord.customerDetails.firstName} {ord.customerDetails.lastName})</span>
                      </div>
                      <span className="text-zinc-400">{ord.date}</span>
                      <span className="text-white font-bold">₺{ord.total.toLocaleString('tr-TR')}</span>
                      <span className="px-2 py-0.5 bg-zinc-800 text-zinc-200 uppercase text-[10px] font-bold">
                        {ord.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                    ÜRÜN KATALOĞU YÖNETİMİ
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Yeni ürün ekleyin, fiyatları ve açıklamaları güncelleyin.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setFormName('');
                    setFormSku(`BF-${Math.floor(100 + Math.random() * 900)}`);
                    setFormPrice(490);
                    setFormDescription('');
                    setFormMaterials('92% Lenzing MicroModal, 8% Elastan');
                    setIsAddingNew(!isAddingNew);
                  }}
                  className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-zinc-200 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>{isAddingNew ? 'İptal' : 'Yeni Ürün Ekle'}</span>
                </button>
              </div>

              {/* Add / Edit Form */}
              {isAddingNew && (
                <form onSubmit={handleSaveProduct} className="p-5 bg-[#141416] border border-zinc-700 space-y-4 animate-fadeIn">
                  <h4 className="font-bold text-sm text-white uppercase tracking-wider">
                    {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Oluştur'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Ürün Adı *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Örn: SilkModal Air Boxer"
                        className="w-full bg-[#1c1c20] border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        SKU Kodu *
                      </label>
                      <input
                        type="text"
                        required
                        value={formSku}
                        onChange={(e) => setFormSku(e.target.value)}
                        className="w-full bg-[#1c1c20] border border-zinc-700 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Kategori *
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as Category)}
                        className="w-full bg-[#1c1c20] border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white uppercase"
                      >
                        <option value="underwear">Underwear</option>
                        <option value="sportswear">Sportswear</option>
                        <option value="new-arrivals">New Arrivals</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Fiyat (TL) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        className="w-full bg-[#1c1c20] border border-zinc-700 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                        Kampanya Satış Fiyatı (Opsiyonel)
                      </label>
                      <input
                        type="number"
                        value={formSalePrice || ''}
                        onChange={(e) => setFormSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                        placeholder="İndirim yoksa boş bırakın"
                        className="w-full bg-[#1c1c20] border border-zinc-700 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Açıklama
                    </label>
                    <textarea
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Ürün anatomik kesimi ve konfor özellikleri..."
                      className="w-full bg-[#1c1c20] border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Materyal & Lif Karışımı
                    </label>
                    <input
                      type="text"
                      value={formMaterials}
                      onChange={(e) => setFormMaterials(e.target.value)}
                      placeholder="92% MicroModal, 8% Elastan"
                      className="w-full bg-[#1c1c20] border border-zinc-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 cursor-pointer"
                    >
                      {editingProduct ? 'DEĞİŞİKLİKLERİ KAYDET' : 'ÜRÜNÜ YAYINLA'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="px-6 py-2.5 border border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider hover:text-white cursor-pointer"
                    >
                      İPTAL
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table */}
              <div className="border border-zinc-800 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-[#141416] text-zinc-400 uppercase border-b border-zinc-800">
                      <th className="py-3 px-4">Görsel & Ürün</th>
                      <th className="py-3 px-4">SKU</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Fiyat</th>
                      <th className="py-3 px-4">Renk / Beden</th>
                      <th className="py-3 px-4 text-right">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-900/40 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={p.images.main}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-12 object-cover bg-zinc-950 border border-zinc-800 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-white font-sans text-xs">{p.name}</p>
                            <span className="text-[10px] text-zinc-500 font-mono">{p.colors.length} Renk seçeneği</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-zinc-300">{p.sku}</td>
                        <td className="py-3 px-4 uppercase text-zinc-400">{p.category}</td>
                        <td className="py-3 px-4 text-white tabular-nums">
                          {p.salePrice ? (
                            <span>₺{p.salePrice} <s className="text-zinc-500 text-[10px]">₺{p.price}</s></span>
                          ) : (
                            <span>₺{p.price}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-zinc-400 text-[11px]">
                          {p.sizes.join(', ')}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => startEditProduct(p)}
                            className="p-1.5 text-zinc-400 hover:text-white rounded-xs hover:bg-zinc-800 cursor-pointer"
                            title="Düzenle"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`${p.name} ürününü silmek istediğinize emin misiniz?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-zinc-500 hover:text-red-400 rounded-xs hover:bg-zinc-800 cursor-pointer"
                            title="Sil"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                  SİPARİŞ VE KARGO YÖNETİMİ
                </h3>
                <p className="text-xs text-zinc-400">
                  Gelen siparişlerin durumunu güncelleyin ve Yurtiçi Kargo takip numarasını girin.
                </p>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 bg-[#141416] border border-zinc-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-800 font-mono text-xs">
                      <div>
                        <span className="text-zinc-500 text-[10px] uppercase">Sipariş No</span>
                        <p className="font-bold text-white text-sm">{ord.orderNumber}</p>
                      </div>

                      <div>
                        <span className="text-zinc-500 text-[10px] uppercase">Müşteri</span>
                        <p className="text-white font-sans font-medium">
                          {ord.customerDetails.firstName} {ord.customerDetails.lastName}
                        </p>
                        <p className="text-[11px] text-zinc-400">{ord.customerDetails.phone}</p>
                      </div>

                      <div>
                        <span className="text-zinc-500 text-[10px] uppercase">Tutar</span>
                        <p className="font-bold text-white tabular-nums">₺{ord.total.toLocaleString('tr-TR')}</p>
                      </div>

                      {/* Status Selector */}
                      <div>
                        <span className="text-zinc-500 text-[10px] uppercase block mb-1">Durum Güncelle</span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-zinc-950 border border-zinc-700 text-xs px-2.5 py-1 text-white uppercase focus:outline-none focus:border-white font-sans"
                        >
                          <option value="Order Received">Order Received</option>
                          <option value="Payment Confirmed">Payment Confirmed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Tracking number input */}
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <Truck size={16} className="text-zinc-400" />
                      <span className="text-zinc-400">Takip Kodu:</span>
                      <input
                        type="text"
                        defaultValue={ord.trackingNumber || ''}
                        onBlur={(e) => updateOrderStatus(ord.id, ord.status, e.target.value)}
                        placeholder="Örn: YK-94819284"
                        className="bg-zinc-950 border border-zinc-800 px-3 py-1 text-white text-xs font-mono focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INVENTORY / STOCK MATRIX TAB */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                  VARYANT BAZLI STOK MATRİSİ
                </h3>
                <p className="text-xs text-zinc-400">
                  Her ürünün renk ve bedenine göre stok adetlerini canlı düzenleyin. 0 olan ürünler sitede otomatik "SOLD OUT" gösterilir.
                </p>
              </div>

              <div className="space-y-4">
                {products.map((p) => (
                  <div key={p.id} className="p-4 bg-[#141416] border border-zinc-800 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                      <strong className="text-white font-sans text-sm">{p.name} ({p.sku})</strong>
                      <span className="text-zinc-500 uppercase">{p.category}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {p.sizes.map((sz) => {
                        const variantKey = `${p.colors[0].name}-${sz}`;
                        const currentStock = p.stockByVariant[variantKey] ?? 12;

                        return (
                          <div key={sz} className="p-2.5 bg-zinc-950 border border-zinc-800 text-center">
                            <span className="text-zinc-400 block text-[11px] mb-1">{sz} Beden</span>
                            <input
                              type="number"
                              min={0}
                              value={currentStock}
                              onChange={(e) => updateVariantStock(p.id, variantKey, Number(e.target.value))}
                              className="w-16 mx-auto text-center bg-zinc-900 border border-zinc-700 text-white font-mono text-xs py-1"
                            />
                            <span className={`block text-[9px] mt-1 uppercase ${currentStock === 0 ? 'text-red-400 font-bold' : 'text-zinc-500'}`}>
                              {currentStock === 0 ? 'TÜKENDİ' : `${currentStock} Adet`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COUPONS TAB */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                  İNDİRİM VE PROMOSYON KODLARI
                </h3>
                <p className="text-xs text-zinc-400">
                  Sepette kullanılan aktif indirim kuponları listesi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                {coupons.map((c) => (
                  <div key={c.code} className="p-4 bg-[#141416] border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{c.code}</span>
                      <span className="text-emerald-400 font-bold">
                        {c.discountPercent ? `%${c.discountPercent} İndirim` : `₺${c.discountFixed}`}
                      </span>
                    </div>
                    <p className="text-zinc-400 font-sans text-xs">{c.description}</p>
                    <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-500">
                      Min. Sepet Tutarı: ₺{c.minOrder}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
