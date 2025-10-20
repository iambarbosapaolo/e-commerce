import { Product } from '../lib/types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { RatingStars } from './rating-stars';
import { useApp } from '../lib/app-context';
import { useCart } from '../lib/cart-context';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { setCurrentPage, setSelectedProductId } = useApp();
  const { addItem } = useCart();

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setCurrentPage('product-detail');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock === 0) {
      toast.error('This item is out of stock');
      return;
    }
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div
      className="group cursor-pointer rounded-lg border bg-card hover:shadow-lg transition-shadow duration-200"
      onClick={handleCardClick}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.tags.map(tag => (
            <Badge
              key={tag}
              variant={tag === 'Sale' ? 'destructive' : 'default'}
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
          {discountPercent > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercent}%
            </Badge>
          )}
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary">Sold Out</Badge>
          </div>
        )}
        {product.stock > 0 && product.stock < 10 && (
          <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
            Low Stock
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-2">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">{product.category}</p>
          <h3 className="line-clamp-2 min-h-[3rem]">{product.name}</h3>
        </div>

        <RatingStars rating={product.rating} size={14} showNumber count={product.reviewCount} />

        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className="text-muted-foreground line-through text-sm">
              ${product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1.5">
            {product.colors.slice(0, 5).map((color, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 5 && (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-muted flex items-center justify-center text-xs">
                +{product.colors.length - 5}
              </div>
            )}
          </div>
        )}

        <Button
          className="w-full"
          size="sm"
          onClick={handleQuickAdd}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Out of Stock' : 'Quick Add'}
        </Button>
      </div>
    </div>
  );
}
