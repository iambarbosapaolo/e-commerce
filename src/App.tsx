import { AppProvider, useApp } from './lib/app-context';
import { CartProvider } from './lib/cart-context';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { CartDrawer } from './components/cart-drawer';
import { HomePage } from './components/pages/home-page';
import { ProductListingPage } from './components/pages/product-listing-page';
import { ProductDetailPage } from './components/pages/product-detail-page';
import { CartPage } from './components/pages/cart-page';
import { CheckoutPage } from './components/pages/checkout-page';
import { AccountPage } from './components/pages/account-page';
import { AdminPage } from './components/pages/admin-page';
import { SearchPage } from './components/pages/search-page';
import { Toaster } from './components/ui/sonner';
import { useEffect } from 'react';

function AppContent() {
  const { currentPage, isDark } = useApp();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'products' && <ProductListingPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'admin' && <AdminPage />}
        {currentPage === 'search' && <SearchPage />}
      </main>
      <Footer />
      <CartDrawer />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AppProvider>
  );
}
