import { Button } from './ui/button';
import { Input } from './ui/input';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-white font-semibold">V</span>
              </div>
              <span className="font-semibold text-xl">VERVE</span>
            </div>
            <p className="text-muted-foreground max-w-xs">
              Premium wellness and lifestyle products to help you live your best life naturally.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4">Shop</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe for exclusive offers and wellness tips.
            </p>
            <form className="space-y-2">
              <Input type="email" placeholder="Your email" />
              <Button className="w-full" variant="default">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 VERVE. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
