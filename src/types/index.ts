export type Category = 'underwear' | 'sportswear' | 'new-arrivals' | 'packs';
export type Gender = 'men' | 'women' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
  label: string;
}

export interface ProductImages {
  main: string;
  front: string;
  back: string;
  side: string;
  detail: string;
  lifestyle?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitFeedback: 'True to size' | 'Runs small' | 'Runs large';
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  subtitle: string;
  category: Category;
  gender: Gender;
  price: number;
  salePrice?: number;
  description: string;
  materials: string;
  fit: string;
  care: string;
  features: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  images: ProductImages;
  colors: ProductColor[];
  sizes: Size[];
  stockByVariant: Record<string, number>; // e.g. "Pitch Black-M": 24
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item id (productId + color + size)
  product: Product;
  selectedColor: ProductColor;
  selectedSize: Size;
  quantity: number;
}

export type OrderStatus =
  | 'Order Received'
  | 'Payment Confirmed'
  | 'Preparing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'paytr';
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  customerDetails: CustomerDetails;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  minOrder: number;
  active: boolean;
  description: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  image: string;
}
