import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { useCart } from '../../lib/cart-context';
import { useApp } from '../../lib/app-context';
import { Check, CreditCard } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { items, subtotal, clearCart } = useCart();
  const { setCurrentPage } = useApp();

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, name: 'Contact' },
    { number: 2, name: 'Shipping' },
    { number: 3, name: 'Payment' },
    { number: 4, name: 'Review' },
  ];

  const handleComplete = () => {
    clearCart();
    toast.success('Order placed successfully!');
    setCurrentPage('home');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl lg:text-4xl mb-8">Checkout</h1>

      {/* Stepper */}
      <div className="mb-12">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.number <= currentStep
                      ? 'bg-green-600 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.number < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className="text-sm mt-2 hidden sm:block">{step.name}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    step.number < currentStep ? 'bg-green-600' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Forms */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <div className="space-y-6 border rounded-lg p-6">
              <h2 className="text-xl">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter" className="font-normal">
                    Email me with news and offers
                  </Label>
                </div>
              </div>
              <Button onClick={() => setCurrentStep(2)} className="w-full" size="lg">
                Continue to Shipping
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 border rounded-lg p-6">
              <h2 className="text-xl">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="United States" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" />
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Checkbox id="saveAddress" />
                  <Label htmlFor="saveAddress" className="font-normal">
                    Save this address for future orders
                  </Label>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="w-full">
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(3)} className="w-full" size="lg">
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 border rounded-lg p-6">
              <h2 className="text-xl">Payment Method</h2>
              <RadioGroup defaultValue="card">
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiration</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Name on card</Label>
                  <Input id="cardName" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(2)} className="w-full">
                  Back
                </Button>
                <Button onClick={() => setCurrentStep(4)} className="w-full" size="lg">
                  Review Order
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 border rounded-lg p-6">
              <h2 className="text-xl">Review Your Order</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="mb-2">Contact</h3>
                  <p className="text-muted-foreground">you@example.com</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="mb-2">Shipping Address</h3>
                  <p className="text-muted-foreground">
                    742 Evergreen Terrace<br />
                    Springfield, IL 62701<br />
                    United States
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="mb-2">Payment Method</h3>
                  <p className="text-muted-foreground">Card ending in 3456</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(3)} className="w-full">
                  Back
                </Button>
                <Button onClick={handleComplete} className="w-full" size="lg">
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <div className="border rounded-lg p-6 sticky top-24 space-y-6">
            <h2 className="text-xl">Order Summary</h2>

            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {items.map(item => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0 relative">
                    <ImageWithFallback
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-2">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span>Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
