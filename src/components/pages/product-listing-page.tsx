import { useState } from 'react';
import { ProductCard } from '../product-card';
import { products, categories } from '../../lib/data';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { SlidersHorizontal, X } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { useApp } from '../../lib/app-context';

export function ProductListingPage() {
  const { selectedCategory, setCurrentPage } = useApp();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');

  // Filter products
  let filteredProducts = [...products];

  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(
      p => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      selectedCategories.includes(p.category)
    );
  }

  if (selectedTags.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      p.tags.some(tag => selectedTags.includes(tag))
    );
  }

  filteredProducts = filteredProducts.filter(
    p => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'newest') {
    filteredProducts = filteredProducts.filter(p => p.tags.includes('New'));
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setPriceRange([0, 100]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 100;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.slice(1).map(cat => (
            <div key={cat.slug} className="flex items-center gap-2">
              <Checkbox
                id={cat.slug}
                checked={selectedCategories.includes(cat.name)}
                onCheckedChange={() => toggleCategory(cat.name)}
              />
              <label htmlFor={cat.slug} className="text-sm cursor-pointer flex-1">
                {cat.name} ({cat.count})
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={100}
          step={5}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="mb-3">Filters</h3>
        <div className="flex flex-wrap gap-2">
          {['New', 'Bestseller', 'Sale', 'Eco'].map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => setCurrentPage('home')} className="cursor-pointer">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Mobile Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    !
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No products found</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
