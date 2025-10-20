import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { sampleOrders, sampleAddresses } from '../../lib/data';
import { Package, MapPin, User, CreditCard, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function AccountPage() {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'paid':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl lg:text-4xl mb-8">My Account</h1>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
          <TabsTrigger value="dashboard">
            <User className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Orders</span>
          </TabsTrigger>
          <TabsTrigger value="addresses">
            <MapPin className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Addresses</span>
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl">{sampleOrders.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Spent</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl">
                  ${sampleOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Quick checkout</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl">{sampleAddresses.length}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleOrders.slice(0, 3).map(order => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => setSelectedTab('orders')}>
                View All Orders
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Order History</h2>
          </div>

          <div className="space-y-4">
            {sampleOrders.map(order => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{order.id}</CardTitle>
                      <CardDescription>Placed on {order.date}</CardDescription>
                    </div>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span>
                          {item.product.name} x {item.quantity}
                        </span>
                        <span className="text-muted-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-3 flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        Buy Again
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Saved Addresses</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Address
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sampleAddresses.map(address => (
              <Card key={address.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{address.name}</CardTitle>
                    {address.isDefault && <Badge>Default</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <p>{address.country}</p>
                    <p>{address.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-2 h-3 w-3" />
                        Delete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Payment Methods</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Card
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8" />
                  <div>
                    <CardTitle>•••• 3456</CardTitle>
                    <CardDescription>Expires 12/25</CardDescription>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-3 w-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="mr-2 h-3 w-3" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="border rounded-lg p-6 text-center text-muted-foreground">
            <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No other payment methods saved</p>
            <Button variant="outline" className="mt-4">
              Add Payment Method
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
