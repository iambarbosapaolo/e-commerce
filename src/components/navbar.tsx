import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  Moon,
  Sun,
  Settings,
} from 'lucide-react';
import { useApp } from '../lib/app-context';
import { useCart } from '../lib/cart-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';

export function Navbar() {
  const { setCurrentPage, setIsCartOpen, isDark, toggleDark, setSearchQuery } = useApp();
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    setSearchQuery(query);
    setCurrentPage('search');
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white font-semibold">V</span>
            </div>
            <span className="font-semibold text-xl hidden sm:block">VERVE</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('products')}
              className="hover:text-green-600 transition-colors"
            >
              Shop All
            </button>
            <button
              onClick={() => setCurrentPage('products')}
              className="hover:text-green-600 transition-colors"
            >
              New Arrivals
            </button>
            <button
              onClick={() => setCurrentPage('products')}
              className="hover:text-green-600 transition-colors"
            >
              Best Sellers
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                name="search"
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="hidden sm:inline-flex"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setCurrentPage('account')}>
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentPage('account')}>
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Wishlist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setCurrentPage('admin')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Admin
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <form onSubmit={handleSearch}>
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        name="search"
                        type="search"
                        placeholder="Search products..."
                        className="pl-10 w-full"
                      />
                    </div>
                  </form>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setCurrentPage('products')}
                  >
                    Shop All
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setCurrentPage('products')}
                  >
                    New Arrivals
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setCurrentPage('products')}
                  >
                    Best Sellers
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={toggleDark}
                  >
                    {isDark ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" /> Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" /> Dark Mode
                      </>
                    )}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
