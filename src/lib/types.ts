export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  rating: number;
  reviewCount: number;
  images: string[];
  colors?: Color[];
  sizes?: string[];
  stock: number;
  tags: string[];
  sku: string;
}

export interface Color {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}
