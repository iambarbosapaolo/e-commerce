import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { useApp } from '../lib/app-context';
import { useCart } from '../lib/cart-context';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, setCurrentPage } = useApp();
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    setCurrentPage('cart');
  };

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3>Your cart is empty</h3>
              <p className="text-muted-foreground mt-2">
                Add items to get started
              </p>
            </div>
            <Button onClick={() => setIsCartOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              <div className="space-y-4">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="line-clamp-1">{item.product.name}</h4>
                          <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                            {item.selectedColor && (
                              <p>Color: {item.selectedColor}</p>
                            )}
                            {item.selectedSize && (
                              <p>Size: {item.selectedSize}</p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
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
            </div>

            <div className="border-t pt-4 space-y-4">
              {subtotal < 100 && (
                <div className="bg-muted/50 p-3 rounded-lg text-sm text-center">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (estimated)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span>Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleViewCart}
                >
                  View Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
