import { products } from '../../lib/data';
import { ProductCard } from '../product-card';
import { useApp } from '../../lib/app-context';
import { Search } from 'lucide-react';

export function SearchPage() {
  const { searchQuery } = useApp();

  const searchResults = products.filter(
    p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl mb-2">
          Search Results for "{searchQuery}"
        </h1>
        <p className="text-muted-foreground">
          {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {searchResults.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full bg-muted mx-auto flex items-center justify-center mb-6">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl mb-2">No products found</h2>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search terms or browse our categories
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchResults.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
