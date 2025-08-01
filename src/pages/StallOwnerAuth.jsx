import { useState } from "react";
import { useRouter } from "next/router";
import Button from "$/components/Button";
import AuthCard from "$/components/auth/AuthCard";
import AuthTabs from "$/components/auth/AuthTabs";
import AuthInput from "$/components/auth/AuthInput";
import { supabase } from "$/integrations/supabase/client";
import { useToast } from "$/components/Toast";

const StallOwnerAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    stallName: "",
    ownerName: "",
    phone: "",
    floor: ""
  });
  const router = useRouter();
  const { showToast } = useToast();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/StallPortal`,
          data: {
            stall_name: formData.stallName,
            owner_name: formData.ownerName,
            phone: formData.phone,
            floor: formData.floor,
            role: "stall_owner" // Added role for RLS policies
          }
        }
      });

      if (authError) throw authError;

      showToast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
        type: "success"
      });
    } catch (error) {
      showToast({
        title: "Error",
        description: error.message,
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Check user role before redirecting
      if (data.user?.user_metadata?.role !== "stall_owner") {
        await supabase.auth.signOut();
        throw new Error("This portal is for stall owners only");
      }

      router.push("/StallPortal");
    } catch (error) {
      showToast({
        title: "Error",
        description: error.message,
        type: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <AuthCard 
        title="Stall Owner Portal" 
        description="Manage your canteen stall and orders"
      >
        <div className="flex justify-center">
          <AuthTabs
            tabs={[
              {
                value: "signin",
                label: "Sign In",
                active: activeTab === "signin",
                onClick: () => setActiveTab("signin")
              },
              {
                value: "signup",
                label: "Sign Up",
                active: activeTab === "signup",
                onClick: () => setActiveTab("signup")
              }
            ]}
          />
        </div>
        
        {activeTab === "signin" ? (
          <form onSubmit={handleSignIn} className="space-y-4 mt-6">
            <AuthInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <AuthInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button 
              type="submit" 
              variant="primary"
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4 mt-6">
            <AuthInput
              label="Owner Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.ownerName}
              onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
              required
            />
            <AuthInput
              label="Stall Name"
              type="text"
              placeholder="Enter your stall name"
              value={formData.stallName}
              onChange={(e) => setFormData({ ...formData, stallName: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <AuthInput
                label="Phone"
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                <select
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select floor</option>
                  <option value="1">Ground Floor</option>
                  <option value="2">First Floor</option>
                  <option value="3">Second Floor</option>
                </select>
              </div>
            </div>
            <AuthInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <AuthInput
              label="Password"
              type="password"
              placeholder="Create a password (min 8 characters)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength="8"
            />
            <Button 
              type="submit" 
              variant="primary"
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        )}
      </AuthCard>
    </div>
  );
};

export default StallOwnerAuth;