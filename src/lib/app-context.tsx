import React, { createContext, useContext, useState, ReactNode } from 'react';

type Page = 'home' | 'products' | 'product-detail' | 'cart' | 'checkout' | 'account' | 'admin' | 'search';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    setIsDark(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isDark,
        toggleDark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
