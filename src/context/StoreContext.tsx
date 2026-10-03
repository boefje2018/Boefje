import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Coupon, JournalArticle, OrderStatus, Size, ProductColor } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/products';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  notification: string | null;

  // Cart actions
  addToCart: (product: Product, color: ProductColor, size: Size, quantity?: number) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Totals
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  createOrder: (customerDetails: any, paymentMethod: any) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;

  // Product admin
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateVariantStock: (productId: string, variantKey: string, newStock: number) => void;

  // Modals & Navigation state
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  selectedArticle: JournalArticle | null;
  setSelectedArticle: (a: JournalArticle | null) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isSizeCalcOpen: boolean;
  setIsSizeCalcOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  activeNavCategory: string;
  setActiveNavCategory: (cat: string) => void;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-1049',
    orderNumber: 'BF-882194',
    date: '01 Ekim 2026',
    items: [
      {
        id: 'sample-item-1',
        product: INITIAL_PRODUCTS[0],
        selectedColor: INITIAL_PRODUCTS[0].colors[0],
        selectedSize: 'M',
        quantity: 1
      },
      {
        id: 'sample-item-2',
        product: INITIAL_PRODUCTS[1],
        selectedColor: INITIAL_PRODUCTS[1].colors[0],
        selectedSize: 'M',
        quantity: 1
      }
    ],
    subtotal: 1480,
    discount: 148,
    shipping: 0,
    total: 1332,
    status: 'Shipped',
    trackingNumber: 'YK-9481029482',
    carrier: 'Yurtiçi Kargo',
    customerDetails: {
      firstName: 'Kaan',
      lastName: 'Yılmaz',
      email: 'kaan.yilmaz@example.com',
      phone: '0532 555 12 34',
      address: 'Abdi İpekçi Cad. No: 42 D: 6',
      city: 'İstanbul',
      district: 'Nişantaşı / Şişli',
      postalCode: '34367',
      paymentMethod: 'paytr'
    }
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('boefje_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('boefje_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('boefje_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return ['prod-01', 'prod-04'];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('boefje_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return SAMPLE_ORDERS;
  });

  // Coupons
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSizeCalcOpen, setIsSizeCalcOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [activeNavCategory, setActiveNavCategory] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);

  // Persist
  useEffect(() => {
    localStorage.setItem('boefje_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('boefje_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('boefje_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('boefje_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  // Cart operations
  const addToCart = (product: Product, color: ProductColor, size: Size, quantity: number = 1) => {
    const itemId = `${product.id}-${color.name}-${size}`;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === itemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { id: itemId, product, selectedColor: color, selectedSize: size, quantity }];
    });
    showToast(`SEPETE EKLENDİ: ${product.name} (${size})`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Ürün sepetten çıkarıldı.');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
    if (!found) {
      return { success: false, message: 'Geçersiz indirim kodu.' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Bu kod en az ${found.minOrder} TL tutarındaki siparişlerde geçerlidir.`
      };
    }
    setAppliedCoupon(found);
    showToast(`KUPON UYGULANDI: ${found.code}`);
    return { success: true, message: 'İndirim uygulandı!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Kupon kaldırıldı.');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const cartDiscount = appliedCoupon
    ? appliedCoupon.discountPercent
      ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
      : appliedCoupon.discountFixed || 0
    : 0;

  // Free shipping over 1000 TL
  const cartShipping = cartSubtotal >= 1000 || cartSubtotal === 0 ? 0 : 59;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Favorilerden kaldırıldı');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Favorilere eklendi');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (customerDetails: any, paymentMethod: any) => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `BF-${randomNum}`,
      date: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      status: 'Order Received',
      trackingNumber: `BF-TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: 'Yurtiçi Kargo (Express)',
      customerDetails: {
        ...customerDetails,
        paymentMethod
      }
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status,
              trackingNumber: trackingNumber ?? ord.trackingNumber
            }
          : ord
      )
    );
    showToast(`Sipariş #${orderId} güncellendi: ${status}`);
  };

  // Product management for admin
  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Ürün eklendi: ${newProd.name}`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Ürün güncellendi: ${updated.name}`);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Ürün silindi.');
  };

  const updateVariantStock = (productId: string, variantKey: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            stockByVariant: {
              ...p.stockByVariant,
              [variantKey]: Math.max(0, newStock)
            }
          };
        }
        return p;
      })
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        coupons,
        appliedCoupon,
        notification,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        toggleWishlist,
        isInWishlist,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateVariantStock,
        selectedProduct,
        setSelectedProduct,
        selectedArticle,
        setSelectedArticle,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAccountOpen,
        setIsAccountOpen,
        isAdminOpen,
        setIsAdminOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isSizeCalcOpen,
        setIsSizeCalcOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeNavCategory,
        setActiveNavCategory,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
