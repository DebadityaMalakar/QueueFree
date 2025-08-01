import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "$/components/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "$/components/Card";
import { useToast, ToastContainer } from "$/components/Toast";
import { supabase } from "$/integrations/supabase/client";
import { ShoppingCart, MapPin, Clock, Plus, Minus } from "feather-icons-react";

const StudentPortal = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/StudentAuth");
        return;
      }
      setUser(user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push("/StudentAuth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          stall:stalls(name, floor_number)
        `)
        .eq('is_available', true);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      showToast(
        { title: "Error", description: "Failed to load products" },
        { type: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.product.id !== productId);
    });
  };

  const getCartItemQuantity = (productId) => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'snacks': 'bg-orange-100 text-orange-800',
      'beverages': 'bg-blue-100 text-blue-800',
      'sandwich': 'bg-green-100 text-green-800',
      'burger': 'bg-red-100 text-red-800',
      'salad': 'bg-emerald-100 text-emerald-800',
      'healthy': 'bg-teal-100 text-teal-800',
      'wrap': 'bg-purple-100 text-purple-800',
      'indian': 'bg-yellow-100 text-yellow-800',
      'south-indian': 'bg-amber-100 text-amber-800',
      'roll': 'bg-indigo-100 text-indigo-800',
      'dessert': 'bg-pink-100 text-pink-800',
      'coffee': 'bg-brown-100 text-brown-800',
      'pasta': 'bg-violet-100 text-violet-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">QueueFree Student Portal</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button variant="secondary" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cart.length})
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </div>
            <Button variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Browse products from all canteen stalls and place your order</p>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Card className="mb-8 border-blue-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.product.name} x {item.quantity}</span>
                    <span className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center font-bold text-lg border-t border-gray-200 pt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-blue-600">₹{getTotalAmount().toFixed(2)}</span>
              </div>
              <Button variant="primary" className="w-full mt-4">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg text-gray-900">{product.name}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                    {product.category}
                  </span>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Stall and Floor Info */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{product.stall.name} - Floor {product.stall.floor_number}</span>
                  </div>
                  
                  {/* Preparation Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>{product.preparation_time} min prep time</span>
                  </div>
                  
                  {/* Price and Add to Cart */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                    
                    {getCartItemQuantity(product.id) === 0 ? (
                      <Button
                        onClick={() => addToCart(product)}
                        size="sm"
                        variant="primary"
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                          {getCartItemQuantity(product.id)}
                        </span>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => addToCart(product)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPortal;