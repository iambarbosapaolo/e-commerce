import { Button } from '../ui/button';
import { ProductCard } from '../product-card';
import { products } from '../../lib/data';
import { ArrowRight, Leaf, Recycle, Shield, Truck } from 'lucide-react';
import { useApp } from '../../lib/app-context';

export function HomePage() {
  const { setCurrentPage } = useApp();

  const newArrivals = products.filter(p => p.tags.includes('New')).slice(0, 4);
  const bestSellers = products.filter(p => p.tags.includes('Bestseller')).slice(0, 4);

  const categories = [
    { name: 'Supplements', icon: '💊', color: 'bg-blue-100 dark:bg-blue-950' },
    { name: 'Skincare', icon: '✨', color: 'bg-pink-100 dark:bg-pink-950' },
    { name: 'Fitness', icon: '💪', color: 'bg-purple-100 dark:bg-purple-950' },
    { name: 'Wellness', icon: '🧘', color: 'bg-green-100 dark:bg-green-950' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-green-600 text-white px-4 py-1.5 rounded-full text-sm">
                New Collection Available
              </div>
              <h1 className="text-4xl lg:text-6xl">
                Wellness Made Natural
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover premium wellness products crafted from nature's finest ingredients. Elevate your health journey with VERVE.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => setCurrentPage('products')}>
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                  <Leaf className="h-24 w-24 mx-auto" />
                  <p className="text-2xl">Premium Quality</p>
                  <p className="text-lg opacity-90">100% Natural Ingredients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-muted-foreground">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium">Secure Payment</p>
                <p className="text-sm text-muted-foreground">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Recycle className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium">Eco-Friendly</p>
                <p className="text-sm text-muted-foreground">Sustainable packaging</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium">Natural</p>
                <p className="text-sm text-muted-foreground">Organic ingredients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl mb-4">Shop by Category</h2>
          <p className="text-muted-foreground">Explore our curated collections</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(cat => (
            <button
              key={cat.name}
              className={`${cat.color} p-8 rounded-2xl hover:scale-105 transition-transform duration-200`}
              onClick={() => setCurrentPage('products')}
            >
              <div className="text-5xl mb-4">{cat.icon}</div>
              <h3>{cat.name}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Fresh products just for you</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentPage('products')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl mb-2">Best Sellers</h2>
              <p className="text-muted-foreground">Customer favorites</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentPage('products')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Editorial Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="p-12 lg:p-16 text-white space-y-6">
              <h2 className="text-3xl lg:text-5xl">
                Your Wellness Journey Starts Here
              </h2>
              <p className="text-lg opacity-90">
                Join thousands of customers who've transformed their health with our premium natural products.
              </p>
              <Button size="lg" variant="secondary">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="h-full min-h-[300px] bg-green-700 flex items-center justify-center">
              <Leaf className="h-32 w-32 text-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="bg-muted/50 rounded-2xl p-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl mb-4">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for exclusive offers, wellness tips, and product updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border bg-background"
            />
            <Button type="submit" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
