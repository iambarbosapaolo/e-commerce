import { useState } from 'react';
import { products, reviews } from '../../lib/data';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { RatingStars } from '../rating-stars';
import { ProductCard } from '../product-card';
import { useApp } from '../../lib/app-context';
import { useCart } from '../../lib/cart-context';
import { ShoppingCart, Heart, Minus, Plus, Check, Truck, RefreshCcw, Shield } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ProductDetailPage() {
  const { selectedProductId, setCurrentPage } = useApp();
  const { addItem } = useCart();

  const product = products.find(p => p.id === selectedProductId);
  const productReviews = reviews.filter(r => r.productId === selectedProductId);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2>Product not found</h2>
        <Button className="mt-4" onClick={() => setCurrentPage('products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('This item is out of stock');
      return;
    }
    addItem(product, quantity, selectedColor, selectedSize);
    toast.success(`${product.name} added to cart`);
  };

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

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
            <BreadcrumbLink onClick={() => setCurrentPage('products')} className="cursor-pointer">
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Product Details */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <ImageWithFallback
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    idx === selectedImage ? 'border-green-600' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-3xl lg:text-4xl mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <RatingStars rating={product.rating} size={18} showNumber count={product.reviewCount} />
            </div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
                <Badge variant="destructive">Save {discountPercent}%</Badge>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {product.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {product.stock > 0 && product.stock < 10 && (
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-3">
              <p className="text-sm">Only {product.stock} left in stock!</p>
            </div>
          )}

          {product.stock === 0 && (
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-3">
              <p className="text-sm">Currently out of stock</p>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block mb-3">
                Color: <span className="text-muted-foreground">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'border-green-600 ring-2 ring-green-200 dark:ring-green-900'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block mb-3">Size</label>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block mb-3">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {product.stock} available
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* SKU */}
          <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>

          {/* Info Accordions */}
          <Accordion type="single" collapsible className="border-t pt-4">
            <AccordionItem value="shipping">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Shipping & Delivery
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Free shipping on orders over $100</p>
                  <p>Standard delivery: 5-7 business days</p>
                  <p>Express delivery: 2-3 business days (+$15)</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4" />
                  Returns & Exchanges
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>30-day return policy</p>
                  <p>Free returns on all orders</p>
                  <p>Items must be unused and in original packaging</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="warranty">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Quality Guarantee
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>100% natural and organic ingredients</p>
                  <p>Third-party tested for purity</p>
                  <p>Made in GMP-certified facilities</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Reviews Section */}
      {productReviews.length > 0 && (
        <div className="border-t pt-16 mb-16">
          <h2 className="text-2xl lg:text-3xl mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {productReviews.map(review => (
              <div key={review.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span>{review.author}</span>
                      {review.verified && (
                        <Badge variant="outline" className="gap-1">
                          <Check className="h-3 w-3" />
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <RatingStars rating={review.rating} size={16} />
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-16">
          <h2 className="text-2xl lg:text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
