import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "$/components/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "$/components/Card";
import StatsCard from "$/components/StatsCard";
import { useToast } from "$/components/Toast";
import { supabase } from "$/integrations/supabase/client";
import { ShoppingBag, Clock, TrendingUp, Package, BarChart2, Calendar } from "feather-icons-react";
import StallRegistration from "$/components/StallRegistration";
// import ProductManagement from "$/components/ProductManagement";

const StallPortal = () => {
  const [user, setUser] = useState(null);
  const [stall, setStall] = useState(null);
  const [orders, setOrders] = useState([]);
  const [salesReports, setSalesReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/StallOwnerAuth");
        return;
      }
      setUser(user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push("/StallOwnerAuth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchStallData();
    }
  }, [user]);

  useEffect(() => {
    if (stall) {
      fetchOrders();
      fetchSalesReports();
    }
  }, [stall]);

  const fetchStallData = async () => {
    try {
      const { data, error } = await supabase
        .from('stalls')
        .select('*')
        .eq('owner_email', user?.email)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setStall(data);
    } catch (error) {
      console.error('Error fetching stall:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    if (!stall) return;
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          student_profiles(name, student_id),
          order_items(
            quantity,
            products(name)
          )
        `)
        .eq('stall_id', stall.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      showToast({
        title: "Error",
        description: "Failed to load orders",
        type: "error"
      });
    }
  };

  const fetchSalesReports = async () => {
    if (!stall) return;
    
    try {
      const { data, error } = await supabase
        .from('daily_sales_reports')
        .select('*')
        .eq('stall_id', stall.id)
        .order('report_date', { ascending: false })
        .limit(7);

      if (error) throw error;
      setSalesReports(data || []);
    } catch (error) {
      console.error('Error fetching sales reports:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'preparing': 'bg-blue-100 text-blue-800',
      'ready': 'bg-green-100 text-green-800',
      'completed': 'bg-gray-100 text-gray-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      showToast({
        title: "Success",
        description: `Order status updated to ${newStatus}`,
      });

      if (newStatus === 'completed') {
        fetchSalesReports();
      }
    } catch (error) {
      showToast({
        title: "Error",
        description: "Failed to update order status",
        type: "error"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!stall || !stall.is_registered) {
    return (
      <StallRegistration 
        onRegistrationComplete={fetchStallData}
        userEmail={user?.email || ""}
      />
    );
  }

  const todaySales = salesReports.find(report => 
    report.report_date === new Date().toISOString().split('T')[0]
  );

  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const readyOrders = orders.filter(order => order.status === 'ready').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">QueueFree Vendor Portal</h1>
            <p className="text-sm text-gray-600">{stall.name}</p>
          </div>
          <Button variant="ghost" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Today's Orders" 
            value={todaySales?.total_orders || 0}
            icon={<Package className="h-4 w-4" />}
          />
          <StatsCard 
            title="Pending Orders" 
            value={pendingOrders}
            icon={<Clock className="h-4 w-4" />}
          />
          <StatsCard 
            title="Ready Orders" 
            value={readyOrders}
            icon={<ShoppingBag className="h-4 w-4" />}
          />
          <StatsCard 
            title="Today's Revenue" 
            value={`₹${todaySales?.total_revenue || 0}`}
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex border-b border-gray-200">
            <button className="px-4 py-2 font-medium text-sm text-blue-600 border-b-2 border-blue-600">
              Orders
            </button>
            <button className="px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-700">
              Products
            </button>
            <button className="px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-700">
              Sales Reports
            </button>
            <button className="px-4 py-2 font-medium text-sm text-gray-500 hover:text-gray-700">
              Settings
            </button>
          </div>

          {/* Orders Section */}
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>Track and manage all incoming orders</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No orders yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order #{order.order_token}</h3>
                          <p className="text-sm text-gray-600">
                            Student: {order.student_profiles.name} ({order.student_profiles.student_id})
                          </p>
                          <p className="text-sm text-gray-600">
                            Pickup: {new Date(order.pickup_time_slot).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">₹{order.total_amount}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                        <div className="space-y-1">
                          {order.order_items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm text-gray-700">
                              <span>{item.products.name}</span>
                              <span>x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {order.status === 'pending' && (
                          <Button size="sm" onClick={() => updateOrderStatus(order.id, 'preparing')}>
                            Start Preparing
                          </Button>
                        )}
                        {order.status === 'preparing' && (
                          <Button size="sm" onClick={() => updateOrderStatus(order.id, 'ready')}>
                            Mark Ready
                          </Button>
                        )}
                        {order.status === 'ready' && (
                          <Button size="sm" onClick={() => updateOrderStatus(order.id, 'completed')}>
                            Mark Completed
                          </Button>
                        )}
                        {(order.status === 'pending' || order.status === 'preparing') && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          >
                            Cancel Order
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StallPortal;