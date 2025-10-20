import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from './types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, quantity = 1, color?: string, size?: string) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size
      );

      if (existingIndex > -1) {
        const newItems = [...prev];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }

      return [...prev, { product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
