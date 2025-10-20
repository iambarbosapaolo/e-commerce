import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCart } from '../../lib/cart-context';
import { useApp } from '../../lib/app-context';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const { setCurrentPage } = useApp();

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-muted mx-auto flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-2xl mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Looks like you haven't added anything to your cart yet
            </p>
          </div>
          <Button size="lg" onClick={() => setCurrentPage('products')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => setCurrentPage('products')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
      </div>

      <h1 className="text-3xl lg:text-4xl mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div
              key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
              className="flex gap-4 border rounded-lg p-4"
            >
              <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <ImageWithFallback
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="line-clamp-2 mb-1">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.category}</p>
                    {item.selectedColor && (
                      <p className="text-sm text-muted-foreground">Color: {item.selectedColor}</p>
                    )}
                    {item.selectedSize && (
                      <p className="text-sm text-muted-foreground">Size: {item.selectedSize}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="border rounded-lg p-6 sticky top-24 space-y-6">
            <h2 className="text-xl">Order Summary</h2>

            {subtotal < 100 && (
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (estimated)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span>Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input placeholder="Discount code" />
                <Button variant="outline">Apply</Button>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => setCurrentPage('checkout')}
              >
                Proceed to Checkout
              </Button>
            </div>

            <div className="text-sm text-muted-foreground text-center">
              <p>Secure checkout powered by Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
